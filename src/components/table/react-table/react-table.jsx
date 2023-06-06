import { useTable } from 'react-table'

export default function ReactTable({ ...props }) {
  const { columns, data, tableHooks, name } = props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, tableHooks)
  return (
    <>
      <h2>{name}</h2>
      <table {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, idx) => (
                <th key={idx} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <td key={idx} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
