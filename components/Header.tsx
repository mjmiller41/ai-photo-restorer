
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-md bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center">
        <img src="/assets/images/logo_3.5x1_transparent-bg.png" alt="App Logo" className="h-[2rem]"/>
        <h1 className="text-xl md:text-2xl text-gray-100 tracking-wider font-[goudy_bookletter_1911regular]">
          <span className="hidden text-[#ffd700]">SnapStitch</span>: AI Photo Restoration & Colorize Tool
        </h1>
      </div>
    </header>
  );
};

export default Header;
