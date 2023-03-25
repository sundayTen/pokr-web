import React from 'react';
import styles from './CheckBox.module.scss';

interface CheckBoxProps {
  isChecked: boolean;
  label: string;
}

const CheckBox = ({ label, isChecked }: CheckBoxProps) => {
  return (
    <div className={styles.root}>
      <label htmlFor="check-box">
        <input type="checkbox" id="check-box" checked={isChecked} />
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
