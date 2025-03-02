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
