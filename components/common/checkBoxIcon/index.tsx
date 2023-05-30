import Image from 'next/image';
import React from 'react';

export type CheckBoxType = 'active' | 'inactive' | 'disabled';

interface CheckBoxProps {
  state: CheckBoxType;
  onClick?: () => void;
}
const CheckboxIcon = ({ state, onClick }: CheckBoxProps) => (
  <Image
    width={24}
    height={24}
    src={getSource(state)}
    alt={`체크박스 ${state} 상태`}
    onClick={onClick}
    style={{
      cursor: 'pointer',
    }}
  />
);
export default CheckboxIcon;

const getSource = (state: CheckBoxType) => {
  switch (state) {
    case 'active':
      return '/images/checkbox/checkbox_checked.png';
    case 'disabled':
      return '/images/checkbox/checkbox_disabled.png';
    case 'inactive':
      return '/images/checkbox/checkbox_unchecked.png';

    default:
      return '/images/checkbox/checkbox_unchecked.png';
  }
};
