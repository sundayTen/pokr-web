import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from '@components/common/button/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonStyle?: 'PAINTED' | 'BORDER' | 'BLACK';
  size?: 'FULL' | 'LARGE' | 'MEDIUM' | 'SMALL' | 'XLARGE';
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    label,
    buttonStyle = 'BORDER',
    size = 'MEDIUM',
    disabled,
    ...rest
  } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(styles.root, {
        [styles.full]: size === 'FULL',
        [styles.xlarge]: size === 'XLARGE',
        [styles.large]: size === 'LARGE',
        [styles.medium]: size === 'MEDIUM',
        [styles.small]: size === 'SMALL',
        [styles.painted]: buttonStyle === 'PAINTED',
        [styles.border]: buttonStyle === 'BORDER',
        [styles.black]: buttonStyle === 'BLACK',
      })}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
