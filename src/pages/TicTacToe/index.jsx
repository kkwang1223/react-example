import React, { useEffect, useReducer } from 'react';
import Table from '../../service/TicTacToe/Table';

const initalState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1],
}

const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨. 기존 state 불변하게 유지
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer 라이브러리로 가독성 해결 가능
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        ...initalState,
      }
    }
    default:
      return state;
  }
}

function TicTacToe() {
  // useReducer 비동기로 작동하므로 비즈니스 로직 처리 시 유의
  const [state, dispatch] = useReducer(reducer, initalState);
  const { winner, turn, tableData, recentCell } = state;

  // 비동기 처리엔 useEffect
  useEffect(() => {
    const [row, cell] = recentCell;
    let win = false;
    
    if (row < 0 || cell < 0) { return; }
    
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
      win = true;
    }
    
    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: `${turn}님의 승리입니다. 3초 후 게임이 리셋됩니다.` });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        dispatch({ type: RESET_GAME });
      }, 3000);
      return;
    }

    // 무승부 시
    if(tableData.every(rowData => rowData.every(cell => !!cell))) {
      dispatch({ type: SET_WINNER, winner: '무승부 입니다. 3초 후 게임이 리셋됩니다.' });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        dispatch({ type: RESET_GAME });
      }, 3000);
      return;
    }
    // 그 외 - 다음 턴
    dispatch({ type: CHANGE_TURN });
  }, [recentCell]);

  return (
    <>
      <div>[틱택토]</div>
      <Table dispatch={dispatch} tableData={tableData} />
      {winner && <div>{winner}</div>}
    </>
  )
}

export default TicTacToe;