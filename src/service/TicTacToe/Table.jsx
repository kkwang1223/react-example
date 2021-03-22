import React from 'react';
import Tr from './Tr';

function Table({ dispatch, tableData }) {
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((item, idx) => (
          <Tr key={idx} dispatch={dispatch} rowIdx={idx} rowData={tableData[idx]}>{''}</Tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;