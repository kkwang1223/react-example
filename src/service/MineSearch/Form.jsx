import React, { memo, useCallback, useContext, useState } from 'react';
import { TableContext, ACTION } from '../../pages/MineSearch'

function Form() {
  const [row, setRow] = useState(5);
  const [cell, setCell] = useState(5);
  const [mine, setMine] = useState(5);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: ACTION.START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return(
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
}

export default memo(Form);