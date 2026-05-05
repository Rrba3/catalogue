"use client";

import type { Category } from "@/app/types";

const TABS: { value: Category; label: string; icon: string }[] = [
  { value: "cars", label: "Voitures", icon: "🚗" },
  { value: "motos", label: "Motos", icon: "🏍️" },
  { value: "bicycles", label: "Vélos", icon: "🚲" },
  { value: "trotinette", label: "Trotinette", icon: "🛴" },
];

interface HeaderProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-center gap-4">

        <nav className="flex gap-2 overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              id={`tab-${tab.value}`}
              onClick={() => onTabChange(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${activeTab === tab.value
                ? "bg-primary text-white shadow-lg"
                : "bg-tab-inactive text-tab-text hover:bg-slate-200"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
