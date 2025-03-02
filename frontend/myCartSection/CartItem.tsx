import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Product } from "@/lib/productTypes";
import useCartStore from "@/store/useCartStore"; // Import the cart store
import NotificationPopup from "@/components/extras/Notification"; // Import the NotificationPopup component

interface CartItemProps {
  cartItem: { product: Product; side: "left" | "right" }; // Accept item with product and side
  prices: {
    leftCurrent: string;
    leftOriginal: string;
    rightCurrent: string;
    rightOriginal: string;
  };
  sideLabel: string; // Accept sideLabel prop ("Left Part" or "Right Part")
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, prices, sideLabel }) => {
  const { product } = cartItem;
  const { removeFromCart } = useCartStore(); // Use the removeFromCart function from the store

  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: "", visible: false });

  let partNumber = "";
  let currentPrice = "";
  let originalPrice = "";

  if (sideLabel === "OEM Left Part Number : ") {
    partNumber = product.leftPartNumber;
    currentPrice = prices.leftCurrent;
    originalPrice = prices.leftOriginal;
  } else if (sideLabel === "OEM Right Part Number : ") {
    partNumber = product.rightPartNumber;
    currentPrice = prices.rightCurrent;
    originalPrice = prices.rightOriginal;
  }

  // Show the notification asking for removal confirmation
  const showNotification = () => {
    setNotification({
      message: `Are you sure you want to remove '${product.modelName}' from the cart?`,
      visible: true,
    });
  };

  // Handle item removal after confirmation
  const handleConfirmRemove = () => {
    removeFromCart(product, cartItem.side);
    setNotification({ message: "", visible: false }); // Hide notification
  };

  // Handle cancelation of removal
  const handleCancelRemove = () => {
    setNotification({ message: "", visible: false }); // Hide notification
  };

  return (
    <>
      <div className="flex flex-col xs:flex-row items-center justify-between px-4 py-4 border-t border-gray-200 dark:border-stone-800">
        <div className="relative flex justify-center items-center w-28 xs:w-24 h-24">
          <Image
            src={product.imgPath[0] || "/img-placeholder.svg"}
            alt={product.modelName}
            width={1000}
            height={800}
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className="flex flex-col justify-center items-center xs:items-start w-full xs:w-8/12 xs:pl-4 mt-4 xs:mt-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {product.modelName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {`${sideLabel} ${partNumber}`}
          </p>
          <div className="flex items-center justify-between gap-2 text-lg font-semibold">
            <p className="text-gray-600 dark:text-gray-400">
              {currentPrice || "N/A"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {originalPrice || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col xs:flex-row items-center xs:space-x-4 xs:w-auto mt-4 xs:mt-0">
          <div className="flex items-center custom-quantity-container">
            <button
              type="button"
              className="custom-quantity-btn bg-whiteTwo text-blackOne dark:text-whiteOne dark:bg-blackTwo"
              aria-label="Decrease quantity"
            >
              -
            </button>

            <input
              type="number"
              value={1}
              className="custom-quantity-input pointer-events-none dark:bg-blackOne text-blackOne dark:text-whiteOne"
              readOnly
            />

            <button
              type="button"
              className="custom-quantity-btn bg-whiteTwo text-blackOne dark:text-whiteOne dark:bg-blackTwo"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-5 xs:mt-0"
            onClick={showNotification} // Show the confirmation notification on click
          >
            <FaTrash />
          </button>
          {notification.visible && (
            <NotificationPopup
              message={notification.message}
              onClose={() => setNotification({ message: "", visible: false })}
              handleConfirmRemove={handleConfirmRemove}
              handleCancelRemove={handleCancelRemove}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;
