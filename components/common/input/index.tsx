import React, { CSSProperties, HTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  postfix?: string;
}

const Input = ({ label, postfix, value, ...others }: InputProps) => {
  return (
    <div className={styles.root}>
      <label htmlFor="input">
        {label}
        <br />
        <div className={styles.postfixContainer}>
          <input {...others} value={value} id="input" type="text" />
          {postfix && <span className={styles.postfix}>{postfix}</span>}
        </div>
      </label>
    </div>
  );
};

export default Input;
