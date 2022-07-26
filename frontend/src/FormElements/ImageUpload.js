//Image Upload Component for FORM.
import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'
import ErrorModal from '../Modal/ErrorModal'
import './ImageUpload.css'

const ImageUpload = props => {
  const [File, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const filePickerRef = useRef()
  useEffect(() => {
    if (!File) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(File)
  }, [File])
  const clearError = () => {
    setSizeError(false)
  }
  //Handles Picked Image.
  const pickedHandler = event => {
    let pickedFile
    let fileIsValid = isValid
    if (
      event.target.files &&
      event.target.files.length === 1 &&
      event.target.files[0].size <= 1000000
    ) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      if (
        event.target.files.length === 1 &&
        event.target.files[0].size > 1000000
        ) {
          setSizeError(true)
        }
        setIsValid(false)
        fileIsValid = false
      }
    props.onInput(props.id, pickedFile, fileIsValid)
  }
  //Handles Image Uploading.
  const pickImageHandler = () => {
    filePickerRef.current.click()
  }
  return (
    <React.Fragment>
      {sizeError && <ErrorModal error={"Image should be smaller than 1 Mb"} onClear={clearError}/>}
      <div className='form-control'>
        <input
          type='file'
          ref={filePickerRef}
          id={props.id}
          data-max-size='1000'
          style={{ display: 'none' }}
          accept='.jpg,.png,.jpeg'
          onChange={pickedHandler}
        />
        <div className={`image-control ${props.center && 'center'}`}>
          <div className='image-control__preview'>
            {previewUrl && <img src={previewUrl} alt='Preview' />}
            {!previewUrl && <p>Please pick an image</p>}
          </div>
          <Button type='button' onClick={pickImageHandler}>
            UPLOAD IMAGE
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </React.Fragment>
  )
}

export default ImageUpload
