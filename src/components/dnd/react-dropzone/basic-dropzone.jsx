/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import './basic-dropzone.styles.css'

export default function BasicDropzone({ className, ...props }) {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const { uploadConfig } = props

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFile) => [
        ...previousFile,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      ])
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: uploadConfig.accept,
    maxSize: uploadConfig.maxSize,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (index) => {
    setRejected(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className='container'>
      <section {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        <div className='upload-container'>
          <FontAwesomeIcon className='upload-icon' icon={faCloudArrowUp} />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop files here, or click to select files</p>}
        </div>
      </section>
      <section className='preview-container'>
        {files.length ? (
          <>
            <div className='preview-action'>
              <button className='btn-remove' onClick={removeAll}>
                Remove All
              </button>
              <button className='btn-submit' type='submit'>
                Upload
              </button>
            </div>
            <h2 className='preview-title'>Preview</h2>{' '}
          </>
        ) : null}
        <div className='list-file-container'>
          {files.map((file, idx) => (
            <div key={idx} className='file-item'>
              <img src={file.preview} alt='' width={100} height={100} />
              <button className='btn-close' onClick={() => removeFile(idx)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              {/* <p className='file-name'>{file.name}</p> */}
            </div>
          ))}
        </div>
      </section>
    </form>
  )
}
