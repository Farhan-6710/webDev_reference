"use client";

import React, { useState, useEffect } from "react";
import useCurrencyStore from "@/store/useCurrencyStore";
import { Skeleton } from "../ui/skeleton";

interface OrderSummaryHeaderProps {
  isCouponApplied: boolean;
  subTotal: number; // Receive subtotal directly from parent
  discount: number; // Receive discount amount from parent
}

const OrderSummaryHeader: React.FC<OrderSummaryHeaderProps> = ({
  isCouponApplied,
  subTotal,
  discount,
}) => {
  const { currency } = useCurrencyStore(); // Get the currency from currency store

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // If not loaded yet, return a skeleton
  if (!isLoaded) {
    return (
      <div>
        <Skeleton className="mb-2 h-10 w-full" />
        <Skeleton className="mb-2 h-10 w-full" />
        <Skeleton className="mb-2 h-10 w-full" />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-4 dark:text-gray-200 text-gray-800">
        Order Summary
      </h2>
      <div className="flex justify-between mb-2">
        <p className="font-medium dark:text-gray-300 text-gray-700">
          Subtotal:
        </p>
        <p className="font-medium dark:text-gray-300 text-gray-700">
          ${subTotal.toFixed(2)} {/* Display the subtotal */}
          {currency}
        </p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="font-medium dark:text-gray-300 text-gray-700">
          Delivery:
        </p>
        <p className="font-medium dark:text-gray-300 text-gray-700">
          ${(5.0).toFixed(2)} {currency} {/* Delivery charge */}
        </p>
      </div>
      {isCouponApplied && discount > 0 && (
        <div className="flex justify-between mb-2 font-medium dark:text-green-400 text-green-600">
          <p>Discount (10% off):</p>
          <p>
            −${discount.toFixed(2)} {currency}
          </p>{" "}
          {/* Display the discount */}
        </div>
      )}
    </>
  );
};

export default OrderSummaryHeader;
