import React, { memo } from 'react';

function getColor (number) {
  let color;
  if (number <= 10) {
    color = 'red';
  } else if (number <= 20) {
    color = 'orange';
  } else if (number <= 30) {
    color = 'yellow';
  } else if (number <= 40) {
    color = 'blue';
  } else {
    color = 'green';
  }
  return color;
}

function Ball({ number }) {
  const background = getColor(number);
  return (
    <div className="ball" style={{ background }}>{number}</div>
  );
}

export default memo(Ball);