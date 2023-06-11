import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, value, ...others }: InputProps) => {
  return (
    <div className={styles.root}>
      <label htmlFor="input">
        {label}
        <br />
        <input {...others} value={value} id="input" type="text" />
      </label>
    </div>
  );
};

export default Input;
