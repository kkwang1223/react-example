import React, { useState, useRef } from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('끝말잇기');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const inputRef = useRef();

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    const last = word[word.length - 1];
    const first = value[0];

    if (last === first) {
      setResult('성공');
      setWord(value);
    } else {
      setResult('다시 입력하세요.');
    }
    setValue('');
    inputRef.current.focus();
  }

  return (
    <>
      <div>제시어 : {word}</div>
      <form onSubmit={onSubmitForm}>
        <input type="text" onChange={onChangeInput} ref={inputRef} value={value}></input>
        <button>입력</button>
      </form>
      <div>결과 : {result}</div>
    </>
  );
};

export default WordRelay;