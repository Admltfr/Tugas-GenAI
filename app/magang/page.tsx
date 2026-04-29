"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagangFormComponent } from "@/components/form/MagangFormComponent";
import { PreviewSurat } from "@/components/preview";
import { ExportButton } from "@/components/ui";
import type { MagangForm } from "@/types";
import { useFormContext } from "@/context/FormContext";

export default function MagangPage() {
  const { dispatch } = useFormContext();

  const handleFormSubmit = (data: MagangForm) => {
    console.log("Data surat magang:", data);
    dispatch({ type: "SET_MAGANG", payload: data });
  };

  return (
    <main className="flex-1 bg-slate-50 transition-colors dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1800px] grid-cols-1 lg:grid-cols-[minmax(420px,0.9fr)_minmax(540px,1.1fr)]">
        <motion.section
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="border-r border-slate-200 bg-white px-4 py-6 transition-colors sm:px-6 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:px-8 lg:py-8 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              &larr; Kembali ke Beranda
            </Link>

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                Generator Surat
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                Surat Magang
              </h1>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                Isi data akademik, tujuan magang, dan perusahaan tujuan.
              </p>
            </div>

            <MagangFormComponent
              title="Formulir Surat Magang"
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
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Preview
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Pratinjau Surat
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                Real-time
              </span>
              <ExportButton fileName="surat-permohonan-magang" />
            </div>
          </div>

          <div className="h-[calc(100vh-12rem)] min-h-[620px] lg:min-h-0">
            <PreviewSurat type="magang" />
          </div>
        </motion.section>
      </div>
    </main>
  );
}
