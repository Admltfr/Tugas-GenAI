"use client";

import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Generator Surat <span className="text-blue-600">Otomatis</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Buat surat lamaran kerja dan surat magang profesional hanya dalam
            hitungan menit. Tidak perlu khawatir tentang format atau struktur
            surat yang benar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="#templates"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
            >
              Mulai Membuat Surat
            </Link>
            <Link
              href="#about"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <p className="text-gray-600 mt-2">Gratis dan Mudah Digunakan</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">⚡</div>
            <p className="text-gray-600 mt-2">Cepat dan Responsif</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">✓</div>
            <p className="text-gray-600 mt-2">Hasil Profesional</p>
          </div>
        </div>
      </div>
    </section>
  );
};
