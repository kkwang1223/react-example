import React from 'react';
import ReactDom from 'react-dom';

// 끝말잇기
import WordRelay from '../pages/WordRelay';
ReactDom.render(<WordRelay />, document.querySelector('#wordRelay'));

// 숫자야구
import NumBaseball from '../pages/NumBaseball';
ReactDom.render(<NumBaseball />, document.querySelector('#numBaseball'));

// 반응속도 체크
import ResponseCheck from '../pages/ResponseCheck';
ReactDom.render(<ResponseCheck />, document.querySelector('#responseCheck'));

// 가위바위보
import RockScissorsPaper from '../pages/RockScissorsPaper';
ReactDom.render(<RockScissorsPaper />, document.querySelector('#rockScissorsPaper'));