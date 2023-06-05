/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import './basic-dropzone.styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function BasicDropzone({ className }) {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
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
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
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
        <div className='preview-action'>
          <button className='btn-remove' onClick={removeAll}>
            Remove All
          </button>
          <button className='btn-submit' type='submit'>
            Upload
          </button>
        </div>
        {files.length ? <h2 className='preview-title'>Preview</h2> : null}
        <div className='list-file-container'>
          {files.map((file) => (
            <>
              <div key={file.path} className='file-item'>
                <img src={file.preview} alt='' width={100} height={100} />
                <button className='btn-close'>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                {/* <p className='file-name'>{file.name}</p> */}
              </div>
            </>
          ))}
        </div>
      </section>
    </form>
  )
}
