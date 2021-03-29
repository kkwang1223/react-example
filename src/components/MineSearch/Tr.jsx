import React, { memo, useContext } from 'react';
import Td from './Td';
import { TableContext } from '../../pages/MineSearch'

function Tr({ rowIdx }) {
  const { tableData } = useContext(TableContext);

  return(
    <tr>
      { !!tableData[0].length &&
        Array(tableData[0].length).fill().map((item, idx) => <Td key={idx} rowIdx={rowIdx} cellIdx={idx} />)
      }
    </tr>
  );
}

export default memo(Tr);