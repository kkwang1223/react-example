import React, { useState, useRef } from 'react';

function ResponseCheck() {
  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [resTime, setResTime] = useState([]);

  // useRef: 화면 렌더에는 영향 주지 않는 데이터를 변화시킬 때 사용(최적화) -> '*.current'이용
  const timer = useRef(null);
  const startDt = useRef(0);
  const endDt = useRef(0);

  const onClickScreen = () => {
    if(status === 'waiting') {
      setStatus('ready');
      setMessage('초록색이 되면 클릭하세요.');

      timer.current = setTimeout(() => {
        setStatus('now');
        setMessage('지금 클릭');
        startDt.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 사이 무작위 시간
      return;
    }
    // 성급하게 클릭
    if(status === 'ready') {
      timer.current && clearTimeout(timer.current);
      timer.current = null;

      setStatus('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
      return;
    }

    // 반응속도 체크
    if(status === 'now') {
      timer.current && clearTimeout(timer.current);
      timer.current = null;
      endDt.current = new Date();

      setStatus('waiting');
      setMessage('클릭해서 시작하세요.');
      setResTime(prev => [...prev, endDt.current - startDt.current]);
      return;
    }
  };

  const onReset = () => {
    setResTime([]);
  };

  return (
    <>
      <div>[반응속도 체크]</div>
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
      {!!resTime.length && (
        <>
          <div>평균 시간: {resTime.reduce((a, c) => a + c) / resTime.length}ms</div>
          <button onClick={onReset}>리셋</button>
        </>
      )}
    </>
  );
}

export default ResponseCheck;