const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// For storing image in database
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ccgat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
