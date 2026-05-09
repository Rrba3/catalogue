"use client";

import { useState, useMemo } from "react";
import type { Product, Category } from "@/app/types";
import Header from "./Header";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface CatalogAppProps {
  products: Product[];
}

const getAgeMeta = (age: string) => {
  const customLabels: Record<string, { emoji: string; label: string }> = {
    "1-3": { emoji: "👶", label: "1 - 3 ans" },
    "1-4": { emoji: "👶", label: "1 - 4 ans" },
    "2-4": { emoji: "👶", label: "2 - 4 ans" },
    "2-6": { emoji: "🧒", label: "2 - 6 ans" },
    "2-7": { emoji: "🧒", label: "2 - 7 ans" },
    "2-8": { emoji: "🧒", label: "2 - 8 ans" },
    "3":   { emoji: "👶", label: "3 ans" },
    "4-6": { emoji: "🧒", label: "4 - 6 ans" },
    "6-8": { emoji: "🧑", label: "6 - 8 ans" },
  };

  if (customLabels[age]) return customLabels[age];

  const num = parseInt(age);
  let emoji = "🎁";
  if (!isNaN(num)) {
    if (num <= 3) emoji = "👶";
    else if (num <= 6) emoji = "🧒";
    else emoji = "🧑";
  }
  return { emoji, label: age.includes("-") ? `${age.replace("-", " - ")} ans` : `${age} ans` };
};

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

  const sortedAges = useMemo(() => {
    return Object.keys(groupedProducts).sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });
  }, [groupedProducts]);

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
            {sortedAges.map((age) => {
              const meta = getAgeMeta(age);
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
