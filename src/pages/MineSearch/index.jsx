import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import Form from '../../service/MineSearch/Form';
import Table from '../../service/MineSearch/Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,  // cell값이 0 이상이면 open 처리 위함
};

export const ACTION = {
  START_GAME: 'START_GAME',
  OPEN_CELL: 'OPEN_CELL',
  CLICK_MINE: 'CLICK_MINE',
  FLAG_CELL: 'FLAG_CELL',
  QUESTION_CELL: 'QUESTION_CELL',
  NORMAL_CELL: 'NORMAL_CELL',
  INCREMENT_TIMER: 'INCREMENT_TIMER',
};

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initalState = {
  info: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  tableData: [],
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const reducer = (state, action) => {
  const { info, tableData, openedCount, timer } = state;
  const { type, row, cell, mine } = action;
  switch(type) {
    case ACTION.START_GAME: {
      return {
        ...state,
        info: {
          row,
          cell,
          mine,
        },
        tableData: plantMine(row, cell, mine),
        halted: false,
        openedCount: 0,
        timer: 0,
        result: '',
      };
    }
    case ACTION.OPEN_CELL: {
      const data = [...tableData];
      data.forEach((item, idx) => {
        data[idx] = [...tableData[idx]];
      });
      let halted = false;
      let result = '';
      
      // 오픈된 칸
      const openedCell = [];
      // 선택된 셀 주변 검사
      checkAround(row, cell, data, openedCell);

      // 승리 조건
      const isWinGame = info.row * info.cell - info.mine === openedCount + openedCell.length;
      if(isWinGame) {
        halted = true;
        result = `${timer}초만에 승리하였습니다.`;
      }
      return {
        ...state,
        tableData: data,
        openedCount: openedCount + openedCell.length,
        halted,
        result,
      };
    }
    case ACTION.CLICK_MINE: {
      const data = [...tableData];
      data[row] = [...tableData[row]];
      data[row][cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData: data,
        halted: true,
        result: '지뢰찾기에 실패하였습니다.'
      };
    }
    case ACTION.FLAG_CELL: {
      const data = [...tableData];
      data[row] = [...tableData[row]];
      data[row][cell] = data[row][cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
      return {
        ...state,
        tableData: data,
      };
    }
    case ACTION.QUESTION_CELL: {
      const data = [...tableData];
      data[row] = [...tableData[row]];
      data[row][cell] = data[row][cell] === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
      return {
        ...state,
        tableData: data,
      };
    }
    case ACTION.NORMAL_CELL: {
      const data = [...tableData];
      data[row] = [...tableData[row]];
      data[row][cell] = data[row][cell] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;
      return {
        ...state,
        tableData: data,
      };
    }
    case ACTION.INCREMENT_TIMER: {
      return {
        ...state,
        timer: timer + 1,
      }
    }
    default:
      return state;
  }
};

function plantMine(row, cell, mine) {
  // 무작위로 지뢰 인덱스 생성
  const candidtates = Array(row * cell).fill().map((item, idx) => idx);
  const suffle = [];
  while (candidtates.length > row * cell - mine) {
    const chosen = candidtates.splice(Math.floor(Math.random() * candidtates.length), 1)[0];
    suffle.push(chosen);
  }

  // 2차원 배열로 table data 생성
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // 지뢰 세팅
  for (let k = 0; k < suffle.length; k++) {
    const vertical = Math.floor(suffle[k] / cell);
    const horizontal = suffle[k] % cell;
    data[vertical][horizontal] = CODE.MINE;
  }
  return data;
}

function checkAround(row, cell, data, openedCell) {
  // 상하좌우 칸 없으면 리턴
  if (row < 0 || row >= data.length || cell < 0 || cell >= data[0].length) {
    return;
  }
  // 닫힌 칸이 아니라면 리턴
  if (![CODE.NORMAL, CODE.MINE].includes(data[row][cell])) {
    return;
  }
  // 한 번 열었던 칸이면 리턴
  if (openedCell.includes(row + ',' + cell)) { return; }
  openedCell.push(row + ',' + cell);

  // 주변 칸 code value 검사
  let around = [
    // 좌우 칸
    data[row][cell - 1], data[row][cell + 1],
  ];
  // 윗 줄
  if (data[row - 1]) {
    around = around.concat(data[row - 1][cell - 1], data[row - 1][cell], data[row - 1][cell + 1]);
  }
  // 아래 줄
  if (data[row + 1]) {
    around = around.concat(data[row + 1][cell - 1], data[row + 1][cell], data[row + 1][cell + 1]);
  }
  // 지뢰 수 계산
  const mineCount = around.filter(item => {
    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(item);
  }).length;

  // 주변 칸 열기 (재귀)
  if (mineCount === 0) {
    const near = [];
    if (row - 1 > -1) {
      near.push([row - 1, cell - 1]);
      near.push([row - 1, cell]);
      near.push([row - 1, cell + 1]);
    }
    near.push([row, cell - 1]);
    near.push([row, cell + 1]);
    if (row + 1 < data.length) {
      near.push([row + 1, cell - 1]);
      near.push([row + 1, cell]);
      near.push([row + 1, cell + 1]);
    }
    near.forEach((item) => {
      const rowIdx = item[0];
      const cellIdx = item[1];

      if (data[rowIdx][cellIdx] === CODE.OPENED) { return; }

      checkAround(rowIdx, cellIdx, data, openedCell);
    });
  }
  data[row][cell] = mineCount;
}

function MineSearch() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { timer, result, tableData, halted } = state;
  const value = useMemo(() => ({
    tableData,
    halted,
    dispatch,
  }), [tableData, halted]);

  useEffect(() => {
    let interval = null; 
    if (!halted) {
      interval = setInterval(() => {
        dispatch({ type: ACTION.INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(interval)
    }
  }, [halted]);

  return(
    <TableContext.Provider value={value}>
      <div>[지뢰찾기]</div>
      <Form />
      <div>게임 시간: {timer}</div>
      <Table></Table>
      <div>{result}</div>
    </TableContext.Provider>
  );
}

export default MineSearch;