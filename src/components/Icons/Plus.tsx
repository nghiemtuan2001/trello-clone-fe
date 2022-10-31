import React from 'react';

const PlusIcon = ({ color = '#3A79F9', ...props }) => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.54134 7.97774V0.894409H9.20801V7.97774H16.2913V9.64441H9.20801V16.7277H7.54134V9.64441H0.458008V7.97774H7.54134Z"
        fill={color}
      />
    </svg>
  );
};

export default PlusIcon;
