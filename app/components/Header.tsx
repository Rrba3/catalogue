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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border py-3 sm:py-0">
      <div className="max-w-[1200px] mx-auto px-2 sm:px-6 min-h-[4rem] flex items-center justify-center">
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 w-full">
          {/* First 3 tabs in a row */}
          <div className="flex justify-center gap-2 w-full sm:w-auto">
            {TABS.slice(0, 3).map((tab) => (
              <button
                key={tab.value}
                id={`tab-${tab.value}`}
                onClick={() => onTabChange(tab.value)}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-tab-inactive text-tab-text hover:bg-slate-200"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          {/* Trotinette tab in a column centered on mobile, inline on desktop */}
          <div className="flex justify-center w-full sm:w-auto mt-1 sm:mt-0">
            {TABS.slice(3).map((tab) => (
              <button
                key={tab.value}
                id={`tab-${tab.value}`}
                onClick={() => onTabChange(tab.value)}
                className={`px-6 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-tab-inactive text-tab-text hover:bg-slate-200"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
