"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import styles from "./productid.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { handleAddToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id as string);
        setProduct(res.data);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    setAddError("");
    try {
      await handleAddToCart(product._id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add to bag");
    }
  };

  if (loading) {
    return (
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonInfo}>
            <div className={`${styles.skeletonLine} ${styles.skeletonLineSm}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonLineLg}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonLineSm}`} />
            <div className={styles.skeletonBlock} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorWrap}>
        <p className={styles.errorText}>{error || "Product not found."}</p>
        <button onClick={() => router.push("/")} className={styles.backToProducts}>
          BACK TO PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.breadcrumb}>
        <button onClick={() => router.push("/")} className={styles.breadcrumbBtn}>
          PRODUCTS
        </button>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>
          {product.category.toUpperCase()}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className={styles.info}>
          <p className={styles.category}>{product.category.toUpperCase()}</p>

          <h1 className={styles.title}>{product.name}</h1>

          <p className={styles.price}>₹{product.price.toLocaleString()}</p>

          <div className={styles.divider} />

          <p className={styles.description}>{product.description}</p>

          <p className={styles.stock}>
            {product.stock > 0 ? `${product.stock} IN STOCK` : "OUT OF STOCK"}
          </p>

          {product.stock > 0 && (
            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>QTY</span>
              <div className={styles.qtyBox}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={styles.qtyBtn}
                >
                  −
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className={styles.qtyBtn}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={product.stock === 0 || added}
            className={`${styles.addBtn} ${
              added
                ? styles.addBtnAdded
                : product.stock === 0
                ? styles.addBtnDisabled
                : ""
            }`}
          >
            {added
              ? "ADDED TO BAG"
              : product.stock === 0
              ? "OUT OF STOCK"
              : "ADD TO BAG"}
          </button>

          {addError && <p className={styles.errorMsg}>{addError}</p>}

          <button onClick={() => router.back()} className={styles.backBtn}>
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );
}