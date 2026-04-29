"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ExportButtonProps {
  fileName: string;
}

const buildExportHtml = (letterHtml: string) => `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Export Surat</title>
    <style>
      body {
        margin: 0;
        background: #e5e7eb;
        color: #020617;
        font-family: "Times New Roman", Times, serif;
      }

      .page {
        width: 210mm;
        min-height: 297mm;
        margin: 24px auto;
        padding: 20mm 24mm 22mm;
        background: white;
        box-sizing: border-box;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
        font-size: 12pt;
        line-height: 1.5;
      }

      table {
        border-collapse: collapse;
      }

      @media print {
        body {
          background: white;
        }

        .page {
          margin: 0;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">${letterHtml}</main>
  </body>
</html>`;

export const ExportButton: React.FC<ExportButtonProps> = ({ fileName }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isExporting) return;

    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 18, 92));
    }, 120);

    return () => window.clearInterval(interval);
  }, [isExporting]);

  const handleExport = async () => {
    const letter = document.querySelector("[data-letter-document]");
    if (!letter) return;

    setIsExporting(true);
    setProgress(12);

    await new Promise((resolve) => window.setTimeout(resolve, 450));

    const exportHtml = buildExportHtml(letter.innerHTML);
    const blob = new Blob([exportHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.html`;
    link.click();

    URL.revokeObjectURL(url);
    setProgress(100);

    window.setTimeout(() => {
      setIsExporting(false);
      setProgress(0);
    }, 450);
  };

  return (
    <div className="w-full max-w-44">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-wait disabled:bg-slate-500 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:disabled:bg-slate-500 dark:disabled:text-white"
      >
        {isExporting && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-slate-950/30 dark:border-t-slate-950" />
        )}
        {isExporting ? "Mengekspor..." : "Export File"}
      </button>

      {isExporting && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
          />
        </motion.div>
      )}
    </div>
  );
};
