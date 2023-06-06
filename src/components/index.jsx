import BasicDropzone from '~/components/dnd/react-dropzone/basic-dropzone'

export default function Index() {
  const uploadConfig = {
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    multiple: false
  }

  return (
    <BasicDropzone className='dropzone-container' uploadConfig={uploadConfig} />
    // <div className='container'>
    //   <ReactTable name='Data' columns={dataHeader} data={data} tableHooks={tableHooks} />
    // </div>
  )
}
