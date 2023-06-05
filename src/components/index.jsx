/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useEffect, useMemo, useState } from 'react'
import ReactTable from './table/react-table/react-table'
import dataHeader from '~/resources/csv-header/data-header'
import dataJson from '~/data/data.dummy.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function Data() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    //write code to fetch your data from api here
    setData(dataJson)
  }

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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container'>
      <ReactTable name='Data' columns={dataHeader} data={data} tableHooks={tableHooks} />
    </div>
  )
}
