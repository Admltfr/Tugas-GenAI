"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { exportToPDF } from "@/lib/export/pdf";
import { exportToDocx } from "@/lib/export/docx";

interface ExportButtonProps {
  fileName: string;
  type: "lamaran" | "magang";
}

export const ExportButton: React.FC<ExportButtonProps> = ({ fileName, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { state } = useFormContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = async () => {
    setIsOpen(false);
    const element = document.querySelector("[data-letter-document]") as HTMLElement;
    if (!element) return;

    setIsExporting(true);
    try {
      await exportToPDF(element, fileName);
    } catch (error) {
      console.error("PDF Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDocx = async () => {
    setIsOpen(false);
    setIsExporting(true);
    try {
      const data = type === "lamaran" ? state.lamaran : state.magang;
      await exportToDocx(type, data || {}, fileName);
    } catch (error) {
      console.error("DOCX Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    setIsOpen(false);
    window.print();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isExporting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-wait disabled:bg-slate-500 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          {isExporting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-slate-950/30 dark:border-t-slate-950" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          )}
          {isExporting ? "Memproses..." : "Cetak / Export"}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-slate-700">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={handleExportPDF}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-700"
              role="menuitem"
            >
              Export PDF (.pdf)
            </button>
            <button
              onClick={handleExportDocx}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-700"
              role="menuitem"
            >
              Export Word (.docx)
            </button>
            <button
              onClick={handlePrint}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-200 dark:hover:bg-slate-700"
              role="menuitem"
            >
              Print Langsung
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
