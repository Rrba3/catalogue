"use client";

import type { Category } from "@/app/types";

const TABS: { value: Category; label: string; icon: string }[] = [
  { value: "cars", label: "Voitures", icon: "🚗" },
  { value: "motos", label: "Motos", icon: "🏍️" },
  { value: "bicycles", label: "Auto Poussoir", icon: "🛺" },
  { value: "trotinette", label: "Trotinette", icon: "🛴" },
];

interface HeaderProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border py-3 sm:py-0">
      <div className="max-w-[1200px] mx-auto px-2 sm:px-6 min-h-[4rem] flex items-center justify-between">
        {/* TODO: replace /logo.png with your actual logo file */}
        <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
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

        {/* Contact buttons — TODO: replace with real phone number and Facebook URL */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:+213XXXXXXXXX"
            className="phone-vibrate flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full transition-colors duration-200 shadow-md whitespace-nowrap"
          >
            📞 <span className="hidden sm:inline">25 240 393</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61577258503254"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#1565d8] text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full transition-colors duration-200 shadow-md whitespace-nowrap"
          >
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            <span className="hidden sm:inline">Facebook</span>
          </a>
        </div>
      </div>
    </header>
  );
}
