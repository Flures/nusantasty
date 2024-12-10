import React from 'react';

const Button = ({ type, onClick, disabled, children, className }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-busy={disabled}
    className={`bg-blue-500 text-white hover:bg-blue-700 p-2 rounded ${className}`}
  >
    {children}
  </button>
);

export default Button;
