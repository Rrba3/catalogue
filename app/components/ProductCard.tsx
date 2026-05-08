"use client";

import type { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      id={`product-card-${product.id}`}
      onClick={onClick}
      className="group bg-transparent transition-all duration-300 hover:scale-[1.05] cursor-pointer text-center w-full flex flex-col items-center"
      style={{ animation: "slideUp 0.4s ease-out backwards" }}
    >
      {/* Image */}
      <div className="relative w-full h-[220px] flex items-center justify-center">
        <img
          src={product.image1}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl mobile-tap-animate"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            {product.badge === "Populaire" ? "🔥" : "✨"} {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 w-full">
        <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-sm text-muted font-medium mt-1">
          {product.price != null ? `${product.price.toLocaleString("fr-FR")} TND` : "—"}
        </p>
      </div>
    </button>
  );
}
