import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCloudArrowUp, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { utils, read } from 'xlsx'
import PreviewImages from '~/components/preview/preview-images'
import ReactTable from '~/components/table/react-table/react-table'
import headerConfig from '~/resources/csv-header/data-header.json'
import './basic-dropzone.styles.css'

export default function BasicDropzone({ className, ...props }) {
  const [files, setFiles] = useState([])
  const [csvData, setCsvData] = useState(null)

  const { uploadConfig } = props

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        ])
      } else if (file.type === 'text/csv') {
        processCsvFile(file)
      } else {
        console.log('Invalid file type:', file.type)
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...uploadConfig,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (index) => {
    setFiles((previousFiles) => previousFiles.filter((_, i) => i !== index))
  }

  const removeAll = () => {
    setFiles([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  const processCsvFile = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const binaryData = e.target.result
      const workbook = read(binaryData, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = utils.sheet_to_json(worksheet)

      console.log(jsonData)

      setCsvData(jsonData)
    }
    reader.readAsBinaryString(file)
  }, [])

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Action',
        Header: 'Action',
        Cell: ({ row }) => (
          <>
            <button className='btn btn-edit' onClick={() => alert('Editing: ' + row.original.id)}>
              <FontAwesomeIcon className='close-icon' icon={faPenToSquare} />
            </button>
            <button className='btn btn-close' onClick={() => alert('Removing: ' + row.original.id)}>
              <FontAwesomeIcon className='close-icon' icon={faXmark} />
            </button>
          </>
        )
      }
    ])
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='container'>
        <section {...getRootProps({ className: className })}>
          <input {...getInputProps()} />
          <div className='upload-container'>
            <FontAwesomeIcon className='upload-icon' icon={faCloudArrowUp} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop files here, or click to select files</p>}
          </div>
        </section>

        {csvData && <ReactTable data={csvData} tableHooks={tableHooks} columns={headerConfig} />}
      </form>
      {files.length > 0 && <PreviewImages files={files} removeFile={removeFile} removeAll={removeAll} />}
    </>
  )
}
