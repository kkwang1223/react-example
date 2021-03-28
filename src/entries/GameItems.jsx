import React from 'react';
import { withRouter } from 'react-router-dom';

import WordRelay from '../pages/WordRelay';
import NumBaseball from '../pages/NumBaseball';
import ResponseCheck from '../pages/ResponseCheck';
import RockScissorsPaper from '../pages/RockScissorsPaper';
import Lotto from '../pages/Lotto';
import TicTacToe from '../pages/TicTacToe';
import MineSearch from '../pages/MineSearch';

export const games = [
  {
    url: '/WordRelay',
    title: '끝말잇기',
    page: WordRelay,
  },
  {
    url: '/NumBaseball',
    title: '숫자 야구',
    page: NumBaseball,
  },
  {
    url: '/ResponseCheck',
    title: '반응속도 체크',
    page: ResponseCheck,
  },
  {
    url: '/RockScissorsPaper',
    title: '가위! 바위! 보!',
    page: RockScissorsPaper,
  },
  {
    url: '/Lotto',
    title: '로또 추첨기',
    page: Lotto,
  },
  {
    url: '/TicTacToe',
    title: '틱택토',
    page: TicTacToe,
  },
  {
    url: '/MineSearch',
    title: '지뢰 찾기',
    page: MineSearch,
  },
];

// props: { history: {...}, location: {...}, match: {...} }
const GameItems = (props) => {
  const { url } = props.match;
  const Game = games.find(item => item.url === url).page;
  return (
    <Game />
  );
};

export default withRouter(GameItems);