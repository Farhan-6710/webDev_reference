"use client"

import React, { useState, useEffect } from "react";
import useCurrencyStore from "@/store/useCurrencyStore";
import { Skeleton } from "../ui/skeleton";

interface CouponSectionProps {
  isCouponApplied: boolean;
  total: number; // Use total directly passed from parent
  couponCode: string; // Track coupon code passed from parent
  setCouponCode: React.Dispatch<React.SetStateAction<string>>; // Function to set coupon code passed from parent
  handleCouponApply: () => void; // Function to handle coupon apply passed from parent
}

const CouponSection: React.FC<CouponSectionProps> = ({
  isCouponApplied,
  total,
  couponCode,
  setCouponCode,
  handleCouponApply,
}) => {
  const { currency } = useCurrencyStore(); // Get the currency from currency store

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted yet, return a skeleton
  if (!isMounted) {
    return (
      <div>
        <Skeleton className="mb-2 h-16 w-full" />
        <Skeleton className="mb-2 h-16 w-full" />
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        id="coupon-code-input"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 transition-transform duration-300 focus:ring-1 focus:ring-primary"
      />
      <p className="text-lg font-medium mb-3 dark:text-gray-400 text-gray-500">
        Enter Coupon code <br />
        <span className="text-primary font-extrabold dark:text-primaryLight">
          &apos;TURBOSHOP10&apos;
        </span>{" "}
        for instant 10% off
      </p>
      <button
        onClick={handleCouponApply}
        disabled={isCouponApplied} // Disable button if coupon is applied
        className={`w-full py-3 transition duration-300 btn-primary ${
          isCouponApplied
            ? "bg-blackTwo text-whiteTwo border border-gray-200 dark:border-stone-800" // Change button style when coupon is applied
            : "bg-primary text-whiteTwo"
        } font-bold`}
      >
        {isCouponApplied ? "Coupon Applied" : "Apply Coupon"} {/* Change button text */}
      </button>

      <div className="flex justify-between mt-4 font-bold text-2xl dark:text-gray-200 text-gray-800">
        <p>Total:</p>
        <p>
          ${total.toFixed(2)} {currency}
        </p>{" "}
        {/* Display discounted total */}
      </div>
    </>
  );
};

export default CouponSection;
