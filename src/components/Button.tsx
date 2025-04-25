import React from 'react';
interface Props {
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'link';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  onClick?: () => void;
}
function Button({
  children,
  className,
  type,
  variant = 'primary',
  rounded = 'full',
  onClick,
}: Props) {
  const roundedClass = rounded === 'none' ? '' : `rounded-${rounded}`;
  return (
    <button
      type={type}
      className={`w-auto 0 px-4 py-1 border-2 text-sm lg:text-base flex items-center justify-center gap-2 border-red-500 ${roundedClass} ${
        variant === 'primary'
          ? 'bg-red-500 text-emerald-50 hover:bg-red-400'
          : 'bg-transparent text-red-500 '
      } ${
        variant === 'link' ? 'underline border-none ' : ''
      } font-bold pb-[7px] text-lg hover:scale-[1.05]  transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
