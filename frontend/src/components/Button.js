import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  disabled,
  children,
  className,
  asChild,
}) => {
  if (asChild) {
    return React.cloneElement(children, {
      className: `bg-blue-500 text-white hover:bg-blue-700 p-2 rounded ${className}`,
    });
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white hover:bg-blue-700 p-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
