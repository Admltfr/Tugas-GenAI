"use client";

import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-slate-950 dark:text-slate-300 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SuratAI</h3>
            <p className="text-sm leading-relaxed">
              Generator surat otomatis untuk memudahkan Anda membuat surat
              lamaran dan magang yang profesional.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#templates"
                  className="hover:text-white transition-colors"
                >
                  Jenis Surat
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Fitur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Kebijakan Privasi
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Syarat Penggunaan
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Hubungi Kami
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              &copy; {currentYear} SuratAI. Semua hak dilindungi.
            </p>
            <div className="flex gap-6">
              <span className="text-sm hover:text-white transition-colors cursor-pointer">
                Twitter
              </span>
              <span className="text-sm hover:text-white transition-colors cursor-pointer">
                Instagram
              </span>
              <span className="text-sm hover:text-white transition-colors cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
