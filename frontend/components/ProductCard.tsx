"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import styles from "./ProductCard.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { handleAddToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    try {
      await handleAddToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to bag");
      setTimeout(() => setError(""), 2500);
    }
  };

  return (
    <div className={styles.card}>
      <Link href={`/products/${product._id}`}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          <div className={styles.overlay} />

          {product.stock > 0 && (
            <div className={styles.addBtnWrap}>
              <button
                onClick={handleAdd}
                className={`${styles.addBtn} ${
                  error
                    ? styles.addBtnError
                    : added
                    ? styles.addBtnAdded
                    : ""
                }`}
              >
                {error ? error : added ? "ADDED TO BAG" : "ADD TO BAG"}
              </button>
            </div>
          )}

          {product.stock === 0 && (
            <div className={styles.soldOutOverlay}>
              <span className={styles.soldOutLabel}>SOLD OUT</span>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <div>
            <Link href={`/products/${product._id}`}>
              <h3 className={styles.name}>{product.name}</h3>
            </Link>
            <p className={styles.category}>{product.category}</p>
          </div>
          <p className={styles.price}>₹{product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}