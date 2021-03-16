import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  rock: '0px',
  scissors: '-142px',
  paper: '-284px',
};

const rspScores = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const cpuChoice = (imgCoord) => {
  const target = Object.entries(rspCoords).find(item => item[1] === imgCoord);
  return target[0];
}

function RockScissorsPaper() {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  
  const timer = useRef(null);

  useEffect(() => { // componentDidMount, conponentDidUpdate 역할(비동기 요청) - 1:1 대응은 아님
    // hook으로 구현 시: useEffect의 imgCoord가 변할 때마다 실행되므로 setInterval -> setTimeout 으로 변경 가능
    // timer.current = setInterval(changeHand, 100);
    timer.current = setTimeout(changeHand, 100);
    return () => { // componentWillUnmount 역할 (비동기 요청 정리)
      // clearInterval(timer.current);
      clearTimeout(timer.current);
    }
  }, [imgCoord]);

  const changeHand = () => {
    const cpuHand = cpuChoice(imgCoord);
    const action = {
      rock: () => {
        setImgCoord(rspCoords['scissors']);
      },
      scissors: () => {
        setImgCoord(rspCoords['paper']);
      },
      paper: () => {
        setImgCoord(rspCoords['rock']);
      },
    }
    const fn = action[cpuHand];
    typeof fn === 'function' && fn();
  }  

  const onClickBtn = (choice) => () => {
    // clearInterval(timer.current);
    clearTimeout(timer.current);

    const myScore = rspScores[choice];
    const cpuScore = rspScores[cpuChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if(diff === 0) {
      setResult('비겼습니다.');
    } else if([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore(prev => prev + 1);
    } else {
      setResult('졌습니다.');
      setScore(prev => prev - 1);
    }

    const pause = setTimeout(() => {
      // timer.current = setInterval(changeHand, 100);
      timer.current = setTimeout(changeHand, 100);
      clearTimeout(pause);
    }, 1000);
  }

  return (
    <>
      <div>[가위!바위!보!]</div>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RockScissorsPaper;