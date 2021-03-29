import React, { memo } from 'react';
import Td from './Td';

function Tr({ dispatch, rowIdx, rowData }) {
  return (
    <tr>
      {Array(rowData.length).fill().map((item, idx) => (
        <Td key={idx} dispatch={dispatch} rowIdx={rowIdx} cellIdx={idx} cellData={rowData[idx]}>{''}</Td>
      ))}
    </tr>
  );
}

export default memo(Tr);