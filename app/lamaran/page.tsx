"use client";

import Link from "next/link";
import { LamaranFormComponent } from "@/components/form/LamaranFormComponent";
import { PreviewSurat } from "@/components/preview";
import type { LamaranForm } from "@/types";
import { useFormContext } from "@/context/FormContext";

export default function LamaranPage() {
  const { dispatch } = useFormContext();

  const handleFormSubmit = (data: LamaranForm) => {
    console.log("Data surat lamaran:", data);
    dispatch({ type: "SET_LAMARAN", payload: data });
    // TODO: Implement letter generation logic here
  };

  return (
    <main className="flex-1">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Surat Lamaran Kerja
          </h1>
          <p className="text-gray-600 mt-2">
            Isi formulir di bawah untuk membuat surat lamaran kerja profesional
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <LamaranFormComponent
              title="Formulir Surat Lamaran Kerja"
              onSubmit={handleFormSubmit}
            />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <PreviewSurat type="lamaran" />
          </div>
        </div>
      </div>
    </main>
  );
}
