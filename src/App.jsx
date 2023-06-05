/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import './App.css'
import Data from '~/components'
import BasicDropzone from '~/components/dnd/react-dropzone/basic-dropzone'
import DragDropFile from '~/components/dnd/basic/drag-drop-file'

function App() {
  return (
    <>
      {/* <BasicDropzone className='dropzone-container' uploadConfig='' /> */}
      <hr />
      <Data />
      {/* <DragDropFile /> */}
    </>
  )
}

export default App
