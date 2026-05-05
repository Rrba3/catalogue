"use client";

import { useState, useMemo } from "react";
import type { Product, Category } from "@/app/types";
import Header from "./Header";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface CatalogAppProps {
  products: Product[];
}

const AGE_LABELS: Record<string, { emoji: string; label: string }> = {
  "2-4": { emoji: "👶", label: "Âge 2-4 ans" },
  "4-6": { emoji: "🧒", label: "Âge 4-6 ans" },
  "6-8": { emoji: "🧑", label: "Âge 6-8 ans" },
};

const AGE_ORDER = ["2-4", "4-6", "6-8"];

export default function CatalogApp({ products }: CatalogAppProps) {
  const [activeTab, setActiveTab] = useState<Category>("cars");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by active category
  const filteredProducts = useMemo(
    () => products.filter((p) => p.category === activeTab),
    [products, activeTab]
  );

  // Group filtered products by age range
  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    for (const product of filteredProducts) {
      if (!groups[product.ageRange]) {
        groups[product.ageRange] = [];
      }
      groups[product.ageRange].push(product);
    }
    return groups;
  }, [filteredProducts]);

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-[1200px] mx-auto px-6 py-8 pt-24">
        {/* Category title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground capitalize">
            {activeTab === "motos" ? "Motos" : activeTab === "cars" ? "Voitures" : "Vélos"}
          </h2>

        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-xl text-muted">
              Aucun produit trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
