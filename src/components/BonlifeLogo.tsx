import React from 'react';

interface BonlifeLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
}

const BonlifeLogo = ({ className = '', variant = 'gold' }: BonlifeLogoProps) => {
  const colors = {
    gold: 'text-gold',
    light: 'text-white',
    dark: 'text-foreground',
  };

  return (
    <span className={`font-extrabold italic tracking-tight select-none ${colors[variant]} ${className}`}
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", textShadow: variant === 'gold' ? '1px 2px 4px rgba(0,0,0,0.15)' : 'none' }}
    >
      Bonlife<sup className="text-[0.4em] font-normal not-italic ml-0.5">®</sup>
    </span>
  );
};

export default BonlifeLogo;
