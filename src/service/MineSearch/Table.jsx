import React, { memo, useContext } from 'react';
import Tr from './Tr';
import { TableContext } from '../../pages/MineSearch'

function Table() {
  const { tableData } = useContext(TableContext);
  return(
    <table>
      <tbody>
        { !!tableData.length &&
          Array(tableData.length).fill().map((item, idx) => <Tr key={idx} rowIdx={idx} />)
        }
      </tbody>
    </table>
  );
}

export default memo(Table);