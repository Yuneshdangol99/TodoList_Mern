import React from 'react';

const Button = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}) => {
  const baseStyle =
    'px-4 py-2 rounded font-medium transition duration-200';

  const variants = {
    primary: 'bg-black text-white py-2 rounded-lg mt-2 hover:opacity-90 w-full cursor-pointer',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
