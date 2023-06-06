import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function PreviewImages({ ...props }) {
  return (
    <form className='preview-container'>
      {props.files.length ? (
        <>
          <div className='preview-action'>
            <button className='btn-remove' onClick={props.removeAll}>
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
        {props.files.map((file, idx) => (
          <div key={idx} className='file-item'>
            <img src={file.preview} alt='' width={100} height={100} />
            <button className='btn-close' onClick={() => props.removeFile(idx)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {/* <p className='file-name'>{file.name}</p> */}
          </div>
        ))}
      </div>
    </form>
  )
}
