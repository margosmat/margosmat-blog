import React from 'react';

interface TileProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
}

const colorMap = {
  red: 'hover:bg-[var(--color-pastel-red)] dark:hover:bg-red-900/30',
  orange: 'hover:bg-[var(--color-pastel-orange)] dark:hover:bg-orange-900/30',
  yellow: 'hover:bg-[var(--color-pastel-yellow)] dark:hover:bg-yellow-900/30',
  green: 'hover:bg-[var(--color-pastel-green)] dark:hover:bg-green-900/30',
  blue: 'hover:bg-[var(--color-pastel-blue)] dark:hover:bg-blue-900/30',
  purple: 'hover:bg-[var(--color-pastel-purple)] dark:hover:bg-purple-900/30',
};

export default function Tile({ children, className = '', hoverColor = 'blue' }: TileProps) {
  const hoverClass = colorMap[hoverColor];

  return (
    <div className={`bg-tile rounded-md p-6 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
