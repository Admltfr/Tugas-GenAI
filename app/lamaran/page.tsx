"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LamaranFormComponent } from "@/components/form/LamaranFormComponent";
import { PreviewSurat } from "@/components/preview";
import { ExportButton } from "@/components/ui";
import type { LamaranForm } from "@/types";
import { useFormContext } from "@/context/FormContext";

export default function LamaranPage() {
  const { dispatch } = useFormContext();

  const handleFormSubmit = (data: LamaranForm) => {
    console.log("Data surat lamaran:", data);
    dispatch({ type: "SET_LAMARAN", payload: data });
  };

  return (
    <main className="flex-1 bg-slate-50 transition-colors dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1800px] grid-cols-1 lg:grid-cols-[minmax(420px,0.9fr)_minmax(540px,1.1fr)]">
        <motion.section
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="border-r border-slate-200 bg-white px-4 py-6 transition-colors sm:px-6 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:px-8 lg:py-8 dark:border-slate-800 dark:bg-slate-950 print:hidden"
        >
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              &larr; Kembali ke Beranda
            </Link>

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Generator Surat
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                Surat Lamaran Kerja
              </h1>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                Isi data pelamar, perusahaan, dan posisi yang dituju.
              </p>
            </div>

            <LamaranFormComponent
              title="Formulir Surat Lamaran Kerja"
              onSubmit={handleFormSubmit}
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
          className="bg-slate-100 px-4 py-6 transition-colors sm:px-6 lg:max-h-[calc(100vh-4rem)] lg:overflow-hidden lg:p-8 dark:bg-slate-900"
        >
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:hidden">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Preview
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Pratinjau Surat
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
                Real-time
              </span>
              <ExportButton fileName="surat-lamaran-kerja" type="lamaran" />
            </div>
          </div>

          <div className="h-[calc(100vh-12rem)] min-h-[620px] lg:min-h-0">
            <PreviewSurat type="lamaran" />
          </div>
        </motion.section>
      </div>
    </main>
  );
}
