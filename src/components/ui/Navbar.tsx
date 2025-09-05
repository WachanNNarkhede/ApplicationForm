import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">        
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="/apply" className="hover:text-gray-300 transition-colors">
            Apply
          </a>
        </div>
        <div className="md:hidden">
          <button
            className="focus:outline-none"
            onClick={() => {
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;