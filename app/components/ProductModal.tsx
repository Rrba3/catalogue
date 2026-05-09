"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/app/types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  return match ? match[1] : null;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean) as string[];

  // Reset video and image index when product changes
  useEffect(() => {
    setShowVideo(false);
    setActiveImageIndex(0);
  }, [product]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const videoId = getYouTubeId(product.video || "");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[1100px] max-h-[90vh] overflow-y-auto z-10"
        style={{ animation: "scaleIn 0.25s ease-out" }}
      >
        {/* Close Button */}
        <button
          id="modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors text-lg cursor-pointer backdrop-blur-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row md:min-h-[500px]">
          {/* Left: Gallery (60%) */}
          <div className="w-full md:w-[60%] p-4 md:p-6 bg-slate-50 flex flex-col gap-4 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            {/* Main Image/Video */}
            <div className="w-full h-[300px] md:h-[450px] bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 relative group">
              {showVideo && videoId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={product.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowVideo(false);
                    setActiveImageIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${!showVideo && activeImageIndex === idx
                    ? "border-primary shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-slate-300"
                    }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
              {/* If there's a video, add a video thumbnail */}
              {product.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 flex items-center justify-center bg-slate-200 cursor-pointer ${showVideo
                    ? "border-primary shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-slate-300"
                    }`}
                  aria-label="Play video"
                >
                  <span className="text-2xl drop-shadow-md">▶️</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Details (40%) */}
          <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col bg-white rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
            {/* Badge */}
            {product.badge && (
              <span className="inline-flex self-start bg-accent/15 text-accent-dark text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge === "Populaire" ? "🔥" : "✨"} {product.badge}
              </span>
            )}

            {/* Name */}
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h2>
            {/* Reference + Age | Price row */}
            <div className="flex items-center justify-between gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-2">
                {product.reference && (
                  <span className="text-sm text-muted">{product.reference}</span>
                )}
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Âge {product.ageRange} ans
                </span>
              </div>
              {product.price != null && (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    {product.price.toLocaleString("fr-FR")} TND
                  </span>
                  {product.promotion && (
                    <>
                      <span className="text-sm text-muted line-through">
                        {Math.round(product.price / 0.8).toLocaleString("fr-FR")} TND
                      </span>
                      <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                        -20%
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Dimensions */}
            <div className="flex items-center gap-2 mt-3 text-sm text-muted">
              <span>📏 {product.dimensions}</span>
            </div>

            {/* Description */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
