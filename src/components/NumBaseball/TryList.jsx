import React, { memo } from 'react';

const TryList = ({ tryInfo }) => {
  return (
    <li>
      <div>입력: {tryInfo.inVal}</div>
      <div>출력: {tryInfo.outVal}</div>
    </li>
  );
};

export default memo(TryList);

