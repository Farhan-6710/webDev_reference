"use client"

import React, { useState } from "react";
import DropdownArrowSVG from "./DropdownArrowSVG";

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Option 1");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center border border-gray-300 dark:border-stone-700 rounded-lg w-fit">
      <div
        className="bg-transparent text-black dark:text-white focus:outline-none focus:ring-0 cursor-pointer p-1 pl-3 pr-7 rounded-lg text-md appearance-none w-[105px]"
        onMouseDown={(e) => e.preventDefault()} // Prevent default dropdown opening on click
        onMouseUp={() => setIsOpen(!isOpen)}    // Toggle dropdown on click
      >
        <span>{selectedOption}</span>
        <DropdownArrowSVG isOpen={isOpen} />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute top-7 z-10 w-full mt-1 bg-white dark:bg-transparent border border-gray-300 dark:border-stone-700 rounded-lg shadow-lg">
          <li
            className="cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-black p-2 py-1"
            onClick={() => handleOptionChange("Option 1")}
          >
            Option 1
          </li>
          <li className="border-t border-gray-300 dark:border-stone-800"></li>
          <li
            className="cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-black p-2 py-1"
            onClick={() => handleOptionChange("Option 2")}
          >
            Option 2
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;


import React from "react";

interface DropdownArrowSVGProps {
    isOpen: boolean;
}

const DropdownArrowSVG:React.FC<DropdownArrowSVGProps> = ({isOpen}) => {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
      <svg
        className={`w-5 h-5 mr-2 text-blackOne dark:text-whiteOne transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default DropdownArrowSVG;

