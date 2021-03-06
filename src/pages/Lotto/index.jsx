import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Ball from '../../components/Lotto/Ball';

function getWinNumbers() {
  const candidtates = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (!!candidtates.length) {
    const num = candidtates.splice(Math.floor(Math.random() * candidtates.length), 1)[0];
    shuffle.push(num);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);

  return [...winNumbers, bonusNumber];
}

function Lotto () {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers.map(val => val));
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ball = winNumbers.shift();
      if(winBalls.length < 6) {
        setWinBalls(prev => [...prev, ball]);
      } else {
        setBonus(ball);
        setRedo(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [winBalls]);
  
  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
  }, [lottoNumbers]);

  return (
    <>
      <div>[로또 추첨기]</div>
      <div>당첨 숫자</div>
      <div id="winNumbers">
        {winBalls.map(ball => <Ball key={ball} number={ball} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
}

export default Lotto;