"use client"

import React, { useState } from "react";
import OrderSummaryHeader from "./OrderSummaryHeader";
import CouponSection from "./CouponSection";
import PaymentMethods from "./PaymentMethods";
import { useCartCalculations } from "@/lib/useCartCalculations";  // Importing the custom hook

const OrderSummary = () => {
  const [isCouponApplied, setIsCouponApplied] = useState(false); // State to track coupon application
  const [couponCode, setCouponCode] = useState(""); // Track coupon code input

  // Use custom hook to get the total (including delivery charge and discount)
  const { getTotal } = useCartCalculations();
  const { getSubtotal } = useCartCalculations();

  const deliveryCharge = 5;  // Example: fixed delivery charge
  const discount = isCouponApplied ? getSubtotal() * 0.1 : 0;  // Calculate discount as 10% of the subtotal when coupon is applied

  // Get the total by calling getTotal
  const total = getTotal(deliveryCharge, discount); // Get the final total with delivery charge and discount
  const subTotal = getSubtotal(); // Get the subtotal

  const handleCouponApply = () => {
    if (couponCode === "TURBOSHOP10") {
      setIsCouponApplied(true);
    } else {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div className="w-full md:w-4/12 border border-gray-200 dark:border-stone-800 p-4 rounded bg-whiteOne dark:bg-blackOne dark:shadow-sm shadow-sm h-fit">
      {/* Pass the necessary props to child components */}
      <OrderSummaryHeader
        isCouponApplied={isCouponApplied}
        subTotal={subTotal}  // Pass the subtotal amount
        discount={discount}  // Pass the discount amount
      />
      <CouponSection
        isCouponApplied={isCouponApplied}
        total={total}  // Pass total to coupon section
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        handleCouponApply={handleCouponApply}
      />
      <PaymentMethods />
    </div>
  );
};

export default OrderSummary;
