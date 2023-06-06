import { useRef, useState } from 'react'
import './drag-drop-file.styles.css'
export default function DragDropFile() {
  const [files, setFiles] = useState(null)

  const inputRef = useRef()

  const handleUpload = (e) => {
    e.preventDefault()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
  }

  return (
    <div className='container'>
      <div className='drop-container' onDragOver={handleDragOver} onDrop={handleDrop}>
        <h1>Drag and drop files</h1>
        <h1>Or</h1>
        <input type='file' multiple onChange={(e) => setFiles(e.target.files)} hidden ref={inputRef} />
        <button onClick={() => inputRef.current.click()}>Select files</button>
      </div>
      {files && (
        <div className='upload'>
          <ul>
            {Array.from(files).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <div className='action'>
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      )}
    </div>
  )
}
