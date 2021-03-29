import React, { useState, useRef } from 'react';
import TryList from '../../components/NumBaseball/TryList';

/**
 * 문제 숫자 생성
 */
function createNumber() {
  const candidtates = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidtates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumBaseball = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const [answer, setAnswer] = useState(createNumber());
  
  const inputRef = useRef();

  const reset = () => {
    alert('게임을 다시 시작합니다.');
    setValue('');
    setAnswer(createNumber());
    setTries([]);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    inputRef.current.focus();

    // 정답일 경우
    if (value === answer.join('')) {
      setResult('홈런!');
      setTries((prevTries) => {
        return [...prevTries, {inVal: value, outVal: '홈런!'}]
      });
      confirm('홈런!') && reset();
      return;
    }

    // 10번 시도 초과로 틀린 경우
    if (tries.length >= 9) {
      setResult(`10번 넘게 틀려 실패! 답은 ${answer.join('')} 였습니다.`);
      reset();
      return;
    }

    // 틀렸을 경우
    const inputArr = value.split('').map(num => parseInt(num));
    let strike = 0;
    let ball = 0;

    answer.forEach((item, idx) => {
      const inputItem = inputArr[idx];
      if (item === inputItem) {
        strike += 1;
        return;
      }
      if (answer.includes(inputItem)) {
        ball += 1;
        return;
      }
    });
    setTries(prevTries => [...prevTries, {inVal: value, outVal: `${strike} 스트라이크, ${ball} 볼 입니다.`}]);
    setValue('');
    setResult('땡!');
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>[숫자야구]</div>
      <div>10번 안에 맞춰야합니다. 4자리 숫자를 입력하세요.</div>
      <form onSubmit={onSubmitForm}>
        <input type="number" onChange={onChangeInput} ref={inputRef} value={value}></input>
        <button>입력</button>
      </form>
      <div>시도 : {tries.length}, 결과: {result}</div>
      <ul>
        {tries.map((item, idx) => {
          return (
            <TryList key={`${idx + 1}차 시도`} tryInfo={item} />
          );
        })}
      </ul>
    </>
  );
}

export default NumBaseball;