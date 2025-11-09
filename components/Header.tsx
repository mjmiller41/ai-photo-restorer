
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-md bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center">
        <img src="/logo_transparent-bg.png" alt="App Logo" className=""/>
        <h1 className="text-xl md:text-2xl font-bold text-gray-100 tracking-wider">
          <span className="text-amber-400">SnapStitch</span>: AI Photo Restoration & Colorize Tool
        </h1>
      </div>
    </header>
  );
};

export default Header;
