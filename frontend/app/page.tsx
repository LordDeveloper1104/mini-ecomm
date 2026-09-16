"use client";

import { useEffect, useState } from "react";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch {
        console.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params: Record<string, string> = {};
        if (search) params.search = search;
        if (selectedCategory) params.category = selectedCategory;
        if (selectedSort) params.sort = selectedSort;

        const res = await getProducts(params);
        setProducts(res.data.products);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delay);
  }, [search, selectedCategory, selectedSort]);

  return (
    <div className="`max-w-screen-xl` mx-auto px-8 py-8">
      {/* Hero Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-[#767676] mb-1">
            COLLECTION
          </p>
          <h1 className="font-editorial text-6xl font-light text-black leading-none">
            New In
          </h1>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSelectedSort}
        />
      </div>

      {/* Item Count */}
      {!loading && !error && (
        <p className="text-[11px] tracking-[0.15em] text-[#767676] mb-6">
          {products.length} ITEMS
        </p>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div
                className="w-full bg-[#F5F5F5] animate-pulse"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="mt-3 h-3 w-32 bg-[#F5F5F5] animate-pulse" />
              <div className="mt-2 h-3 w-20 bg-[#F5F5F5] animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-24 text-center">
          <p className="text-sm text-[#767676]">{error}</p>
          <button
            onClick={() => setSearch((prev) => prev + "")}
            className="mt-6 text-[11px] tracking-[0.15em] border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
          >
            TRY AGAIN
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-black">No results found</p>
          <p className="text-[11px] `tracking-[0.1em]` text-[#767676] mt-2">
            Try a different search or category
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
