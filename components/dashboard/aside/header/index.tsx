import React from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>2023년 1월 1일</h1>
        <div className={styles.buttons}>
          <button className={cn(styles.buttonContainer, styles.todayButton)}>
            오늘
          </button>

          <div className={cn(styles.buttons)}>
            <button
              className={cn(styles.buttonContainer, styles.left)}
            >{`<`}</button>
            <button
              className={cn(styles.buttonContainer, styles.right)}
            >{`>`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
