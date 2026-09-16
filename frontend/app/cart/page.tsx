"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import styles from "./cart.module.css";

interface Order {
  _id: string;
  total: number;
}

type CheckoutState = "idle" | "processing" | "success" | "error";

export default function CartPage() {
  const { cart, totalItems, handleCheckout } = useCart();
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  const onCheckout = async () => {
    setCheckoutState("processing");
    setErrorMessage("");
    try {
      const placedOrder = await handleCheckout();
      setOrder(placedOrder);
      setCheckoutState("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Checkout failed");
      setCheckoutState("error");
    }
  };

  // Order confirmation — shown instead of the bag once checkout succeeds
  if (checkoutState === "success" && order) {
    return (
      <div className={styles.wrap}>
        <div className={styles.confirmWrap}>
          <h1 className={styles.confirmTitle}>Order Placed</h1>
          <p className={styles.confirmText}>
            Thank you — your order has been confirmed.
          </p>
          <p className={styles.confirmId}>Order ID: {order._id}</p>
          <p className={styles.confirmId}>
            Total: ₹{order.total.toLocaleString()}
          </p>
          <Link href="/" className={styles.confirmLink}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Your Bag</h1>
        <div className={styles.emptyWrap}>
          <p className={styles.emptyText}>Your bag is empty</p>
          <Link href="/" className={styles.emptyLink}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Bag</h1>
        <p className={styles.count}>
          {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.itemsCol}>
          <div className={styles.itemsList}>
            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={{
                  ...item,
                  product: {
                    ...item.product,
                    category:
                      "category" in item.product &&
                      typeof item.product.category === "string"
                        ? item.product.category
                        : "",
                  },
                }}
              />
            ))}
          </div>

          <Link href="/" className={styles.continueLink}>
            ← CONTINUE SHOPPING
          </Link>
        </div>

        <div className={styles.summaryCol}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.itemRows}>
              {cart.items.map((item) => (
                <div key={item._id} className={styles.itemRow}>
                  <p className={styles.itemName}>
                    {item.product.name}{" "}
                    <span className={styles.itemQty}>x{item.quantity}</span>
                  </p>
                  <p className={styles.itemPrice}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.subtotalBlock}>
              <div className={styles.subtotalRow}>
                <p className={styles.subtotalLabel}>SUBTOTAL</p>
                <p className={styles.subtotalValue}>
                  ₹{cart.total?.toLocaleString()}
                </p>
              </div>
              <p className={styles.shippingNote}>
                Shipping calculated at checkout
              </p>
            </div>

            <button
              onClick={onCheckout}
              disabled={checkoutState === "processing"}
              className={`${styles.checkoutBtn} ${
                checkoutState === "processing" ? styles.checkoutBtnProcessing : ""
              }`}
            >
              {checkoutState === "processing"
                ? "PROCESSING..."
                : "PROCEED TO CHECKOUT"}
            </button>

            {checkoutState === "error" && (
              <p className={styles.errorMsg}>{errorMessage}</p>
            )}

            <p className={styles.returnsNote}>Free returns on all orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}