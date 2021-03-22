import React, { useCallback, memo } from 'react';

function Td({ dispatch, rowIdx, cellIdx, cellData }) {
  const onClickTd = useCallback(() => {
    if (cellData) { return; }

    dispatch({
      type: 'CLICK_CELL',
      row: rowIdx,
      cell: cellIdx,
    });
  }, [cellData]);
  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
}

export default memo(Td);