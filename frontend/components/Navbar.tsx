"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Note: font-editorial is kept as a utility class assuming it's in your global Tailwind config */}
        <Link href="/" className={`${styles.logo} font-editorial`}>
          SHOPNOW
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            PRODUCTS
          </Link>
          <Link href="/cart" className={styles.navLink}>
            BAG{totalItems > 0 && <span className={styles.bagCount}>({totalItems})</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}