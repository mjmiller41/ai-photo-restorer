
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-md bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center">
        <img src="https://picsum.photos/40/40?grayscale" alt="App Logo" className="w-10 h-10 rounded-full mr-3 border-2 border-amber-500"/>
        <h1 className="text-xl md:text-2xl font-bold text-gray-100 tracking-wider">
          AI Photo <span className="text-amber-400">Restorer</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
