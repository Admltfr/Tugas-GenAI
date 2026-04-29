"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="bg-white/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">SuratAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#templates"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium dark:text-slate-300 dark:hover:text-blue-400"
            >
              Jenis Surat
            </Link>
            <Link
              href="/#features"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium dark:text-slate-300 dark:hover:text-blue-400"
            >
              Fitur
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium dark:text-slate-300 dark:hover:text-blue-400"
            >
              Tentang
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Aktifkan mode ${isDark ? "terang" : "gelap"}`}
              title={`Aktifkan mode ${isDark ? "terang" : "gelap"}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
            </button>
            <Link
              href="/#templates"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Mulai
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
