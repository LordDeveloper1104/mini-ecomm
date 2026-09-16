"use client";

import styles from "./SearchBar.module.css";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="SEARCH"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className={styles.clearBtn}
        >
          ×
        </button>
      )}
    </div>
  );
}