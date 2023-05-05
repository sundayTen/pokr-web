import React from 'react';
import styles from './CountBall.module.scss';

interface CountBallProps {
  count: number;
}

const CountBall = ({ count }: CountBallProps) => {
  return (
    <div className={styles.root}>
      <p>{count}</p>
    </div>
  );
};

export default CountBall;
