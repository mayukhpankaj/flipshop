const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const Item = require('../models/item')
const User = require('../models/users')

// For handling image data of items
const conn = mongoose.createConnection(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ccgat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

let gfs
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
})

// Gets item by id of item
const itemById = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }
  const id = req.params.id
  let item
  try {
    item = await Item.findById(id)
  } catch (err) {
    new HttpError('Item not found!!', 404)
  }
  let creator
  try {
    creator = await User.findById(item.creator)
  } catch (err) {
    new HttpError('User not found!!', 404)
  }
  const { name } = creator
  item.creator = creator.name
  res.status(200).json({ item: item, creatorName: name })
}

// Returns id of all the items of the user
const userItems = async (req, res, next) => {
  const { creator } = req.body
  let existingUser
  try {
    existingUser = await User.findById(creator)
  } catch (err) {
    new HttpError('User not found!!', 404)
  }
  let AllItems
  try {
    AllItems = await Item.find({})
  } catch (err) {
    new HttpError('Failed to fetch data from items', 500)
  }
  let resultArray
  try {
    resultArray = AllItems.filter(item => existingUser.items.includes(item._id))
  } catch (err) {
    new HttpError('Failed to fetch data from items', 500)
  }
  res.status(200).json({ items: resultArray })
}

// Creates new item
const createItem = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, Metamask_add, description, creator, lPrice, hPrice,warranty_period } = req.body
  const createdItem = new Item({
    title,
    description,
    image: req.file.filename,
    imageId: req.file.id,
    lPrice,
    hPrice,
    Metamask_add,
    warranty_period,
    creator: creator
  })

  let user
  try {
    user = await User.findById(createdItem.creator)
  } catch (err) {
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err })
      }
    )
    const error = new HttpError(
      'User authentication failed, please try again.',
      500
    )
    return next(error)
  }

  if (!user) {
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err })
      }
    )
    const error = new HttpError('Could not find user for provided id.', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdItem.save({ session: sess })
    user.items.push(createdItem)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    console.log(err)
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err })
      }
    )
    const error = new HttpError('Creating item failed, please try again.', 500)
    return next(error)
  }
  res.status(201).json({ item: createdItem.toObject({ getters: true }) })
}

// Deletes item from database including image and also from wishlist of other users.
const deleteItem = async (req, res, next) => {
  const { id, creator } = req.body
  let existingItem
  try {
    existingItem = await Item.findById(id).populate('creator')
  } catch (err) {
    new HttpError('Item deletion failed', 500)
  }
  if (!existingItem) {
    new HttpError('Item to be deleted could not be found!!', 404)
  }
  if (existingItem.creator.id !== creator) {
    next(new HttpError('Unauthorized access!!', 401))
  }
  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await existingItem.remove({ session: sess })
    existingItem.creator.items.pull(existingItem)
    await existingItem.creator.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    new HttpError('Something went wrong, could not delete item', 500)
  }
  try {
    gfs.delete(
      new mongoose.Types.ObjectId(existingItem.imageId),
      (err, data) => {
        if (err) {
          new HttpError('Image of item could not be deleted!!', 500)
        }
      }
    )
  } catch (err) {
    new HttpError('Something went wrong, could not delete item', 500)
  }
  let AllUsers
  try {
    AllUsers = await User.find({})
  } catch (err) {
    new HttpError("Item could not be removed from users' wishlist", 500)
  }
  AllUsers.map(user => {
    const wishlistedited = user.wishlist.filter(item => {
      return item !== id
    })
    user.wishlist = wishlistedited
  })
  try {
    AllUsers.map(async user => await user.save())
  } catch (err) {
    new HttpError("Item could not be removed from users' wishlist", 500)
  }
  res.status(200).json({ message: 'Item deletion was a success' })
}

// Gets all the item ids in the database
const getItems = async (req, res) => {
  let items
  try {
    items = await Item.find({})
  } catch (err) {
    const error = new HttpError(
      'Fetching items failed, please try again later.',
      500
    )
    return next(error)
  }
  res.json({ items: items.map(item => item.toObject({ getters: true })) })
}
// Gets image from database
const getImage = (req, res) => {
  gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ error: err })
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    })
}
// Deletes image from database
const deleteImage = (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.json({ error: err })

    res.status(200).json({ message: 'success' })
  })
}
exports.itemById = itemById
exports.createItem = createItem
exports.getImage = getImage
exports.deleteImage = deleteImage
exports.getItems = getItems
exports.userItems = userItems
exports.deleteItem = deleteItem
