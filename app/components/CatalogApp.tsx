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
  "1-3": { emoji: "👶", label: "1 - 3 ans" },
  "2-4": { emoji: "👶", label: "2 - 4 ans" },
  "3":   { emoji: "👶", label: "3 ans" },
  "4-6": { emoji: "🧒", label: "4 - 6 ans" },
  "6-8": { emoji: "🧑", label: "6 - 8 ans" },
};

const AGE_ORDER = ["1-3", "2-4", "3", "4-6", "6-8"];

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

        {/* Products grouped by age */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-12">
            {AGE_ORDER.filter((age) => groupedProducts[age]?.length > 0).map((age) => {
              const meta = AGE_LABELS[age] ?? { emoji: "🎁", label: `${age} ans` };
              return (
                <section key={age}>
                  <h3 className="text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                    <span>{meta.emoji}</span>
                    <span>{meta.label}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {groupedProducts[age].map((product, index) => (
                      <div key={product.id} style={{ animationDelay: `${index * 80}ms` }}>
                        <ProductCard
                          product={product}
                          onClick={() => setSelectedProduct(product)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
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
