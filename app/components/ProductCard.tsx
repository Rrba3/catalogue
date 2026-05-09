"use client";

import { useState } from "react";
import type { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}
//test
export default function ProductCard({ product, onClick }: ProductCardProps) {
  const images = [product.image, product.image1, product.image2, product.image3, product.image4, product.image5, product.image6].filter(Boolean) as string[];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-transparent transition-all duration-300 hover:scale-[1.05] text-center w-full flex flex-col items-center"
      style={{ animation: "slideUp 0.4s ease-out backwards" }}
    >
      {/* Clickable image + info area */}
      <div className="cursor-pointer w-full flex flex-col items-center" onClick={onClick}>
        {/* Image */}
        <div className="relative w-full h-[220px] flex items-center justify-center">
          <img
            src={images[activeIdx]}
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

          {product.price != null ? (
            <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
              {product.promotion && (
                <span className="text-sm text-muted line-through">
                  {Math.round(product.price / 0.8).toLocaleString("fr-FR")} TND
                </span>
              )}
              <span className="text-base font-bold text-primary">
                {product.price.toLocaleString("fr-FR")} TND
              </span>
              {product.promotion && (
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                  -20%
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted font-medium mt-1">—</p>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1.5 mb-2 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`w-10 h-10 rounded border-2 overflow-hidden transition-all ${activeIdx === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
