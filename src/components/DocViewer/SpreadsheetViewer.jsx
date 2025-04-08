import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

const SpreadsheetViewer = ({ openedFile }) => {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    fetchExcelFile()
  }, [])

  const fetchExcelFile = async () => {
    try {
      const response = await fetch(openedFile[0].uri)
      const arrayBuffer = await response.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      const colHeaders = jsonData[0]
      const rowData = jsonData.slice(1)

      setColumns(colHeaders)
      setData(rowData)
    } catch (error) {
      console.error('Error reading Excel file:', error)
    }
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Excel File Viewer</h2>
      {data.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='table-auto border-collapse border border-gray-300 w-full'>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className='border px-4 py-2 bg-gray-100'>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {columns.map((_, j) => (
                    <td key={j} className='border px-4 py-2'>
                      {row[j]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading Excel data...</p>
      )}
    </div>
  )
}

export default SpreadsheetViewer
