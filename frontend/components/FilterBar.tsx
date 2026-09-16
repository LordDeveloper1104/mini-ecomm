"use client";

import styles from "./FilterBar.module.css";

interface Props {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
  onCategoryChange: (val: string) => void;
  onSortChange: (val: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesWrap}>
        <button
          onClick={() => onCategoryChange("")}
          className={`${styles.tabBtn} ${
            selectedCategory === "" ? styles.activeTab : styles.inactiveTab
          }`}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`${styles.tabBtn} ${
              selectedCategory === cat ? styles.activeTab : styles.inactiveTab
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.selectBox}
      >
        <option value="">SORT BY</option>
        <option value="price_asc">PRICE: LOW TO HIGH</option>
        <option value="price_desc">PRICE: HIGH TO LOW</option>
        <option value="newest">NEWEST</option>
      </select>
    </div>
  );
}