import React from 'react';
import Text from '../text';
import styles from './TextArea.module.scss';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, value, ...others }: TextAreaProps) => {
  return (
    <div className={styles.root}>
      <Text variant="LABEL" htmlFor="textarea">
        {label}
        <br />
        <textarea {...others} value={value} id="textarea" />
      </Text>
    </div>
  );
};

export default TextArea;
