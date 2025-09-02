import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CTAButton({ 
  href, 
  children, 
  variant = 'primary',
  className = '' 
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 no-underline';
  
  const variantClasses = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-md',
    secondary: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <Link 
      href={href} 
      className={classes} 
      style={{ 
        color: 'white !important',
        backgroundColor: '#1d4ed8',
        border: 'none',
        textDecoration: 'none'
      }}
    >
      {children}
    </Link>
  );
}
