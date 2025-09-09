import React from "react";
import ShinyText from "../ShinyText";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-950 text-white p-6 fixed w-full top-0 z-10 shadow-md h-22">
      <div className="  w-full mx-auto px-4 flex justify-between items-center">
        <ShinyText
          text="Just some shiny text!"
          disabled={false}
          speed={3}
          className="custom-class  text-4xl"
        />

        <div className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-2xl hover:text-gray-200 hover:scale-105 transition-all duration-300"
          >
            Home
          </a>
          <a
            href="/"
            className="text-2xl hover:text-gray-200 hover:scale-105 transition-all duration-300"
          >
            Apply
          </a>
        </div>
        <div className="md:hidden">
          <button
            className="text-white hover:bg-gray-700 p-2 rounded-md transition-all duration-300"
            onClick={() => {}}
          >
            <svg
              className="w-8 h-8"
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
