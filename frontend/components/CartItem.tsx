"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
      category: string;
    };
    quantity: number;
    _id: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { handleUpdateItem, handleRemoveItem } = useCart();

  return (
    <div className={styles.wrap}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className={styles.image}
          sizes="100px"
        />
      </div>

      {/* Info */}
      <div className={styles.infoWrap}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.category}>
              {item.product.category.toUpperCase()}
            </p>
            <h3 className={styles.name}>{item.product.name}</h3>
          </div>
          <p className={styles.price}>
            ₹{(item.product.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <div className={styles.actionsRow}>
          {/* Quantity */}
          <div className={styles.qtyBox}>
            <button
              onClick={() =>
                item.quantity === 1
                  ? handleRemoveItem(item.product._id)
                  : handleUpdateItem(item.product._id, item.quantity - 1)
              }
              className={styles.qtyBtn}
            >
              −
            </button>
            <span className={styles.qtyValue}>{item.quantity}</span>
            <button
              onClick={() => handleUpdateItem(item.product._id, item.quantity + 1)}
              className={styles.qtyBtn}
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => handleRemoveItem(item.product._id)}
            className={styles.removeBtn}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}