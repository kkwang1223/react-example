import React, { memo, useCallback, useContext } from 'react';
import { ACTION, CODE, TableContext } from '../../pages/MineSearch'

const getTdStyle = (codeValue) => {
  switch(codeValue) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'blue',
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'red',
      };
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (codeValue) => {
  switch(codeValue) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑!';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    case CODE.OPENED:
    default:
      return codeValue > 0 ? codeValue : '';
  }
};

function Td({ rowIdx, cellIdx }) {
  const { tableData, halted, dispatch } = useContext(TableContext);
  const codeValue = tableData[rowIdx][cellIdx];

  const onClickTd = useCallback(() => {
    if (halted) { return; }

    switch(codeValue) {
      case CODE.NORMAL:
        dispatch({ type: ACTION.OPEN_CELL, row: rowIdx, cell: cellIdx });
        return;
      case CODE.MINE: 
        dispatch({ type: ACTION.CLICK_MINE, row: rowIdx, cell: cellIdx });
        return;
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
      default:
        return;
    }
  }, [codeValue, halted]);

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();

    if (halted) { return; }

    switch(codeValue) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: ACTION.FLAG_CELL, row: rowIdx, cell: cellIdx });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: ACTION.QUESTION_CELL, row: rowIdx, cell: cellIdx });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: ACTION.NORMAL_CELL, row: rowIdx, cell: cellIdx });
        return;
      default:
        return;
    }
  }, [codeValue, halted]);

  return(
    <td
      style={getTdStyle(codeValue)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(codeValue)}</td>
  );
}

export default memo(Td);