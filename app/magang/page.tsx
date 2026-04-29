"use client";

import Link from "next/link";
import { BiodataFormComponent } from "@/components/form/BiodataFormComponent";
import type { BiodataForm } from "@/types";

export default function MaagPage() {
  const handleFormSubmit = (data: BiodataForm) => {
    console.log("Data surat magang:", data);
    // TODO: Implement letter generation logic here
  };

  return (
    <main className="flex-1">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
          >
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Surat Magang</h1>
          <p className="text-gray-600 mt-2">
            Isi formulir di bawah untuk membuat surat permohonan magang
            profesional
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BiodataFormComponent
          title="Formulir Surat Magang"
          onSubmit={handleFormSubmit}
        />
      </div>
    </main>
  );
}
