"use client";

import Link from "next/link";
import { MagangFormComponent } from "@/components/form/MagangFormComponent";
import { PreviewSurat } from "@/components/preview";
import type { MagangForm } from "@/types";
import { useFormContext } from "@/context/FormContext";

export default function MaagPage() {
  const { dispatch } = useFormContext();

  const handleFormSubmit = (data: MagangForm) => {
    console.log("Data surat magang:", data);
    dispatch({ type: "SET_MAGANG", payload: data });
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MagangFormComponent
              title="Formulir Surat Magang"
              onSubmit={handleFormSubmit}
            />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <PreviewSurat type="magang" />
          </div>
        </div>
      </div>
    </main>
  );
}
