"use client";

import { motion } from "framer-motion";
import { TemplateCard } from "./TemplateCard";
import type { LetterTemplateType } from "@/types";

const TEMPLATES: LetterTemplateType[] = [
  {
    id: "lamaran",
    name: "Surat Lamaran Kerja",
    description:
      "Buat surat lamaran kerja profesional yang menarik perhatian perusahaan impian Anda.",
    icon: "💼",
    route: "/lamaran",
  },
  {
    id: "magang",
    name: "Surat Magang",
    description:
      "Buat surat permohonan magang yang profesional dan menarik untuk perusahaan pilihan.",
    icon: "🎓",
    route: "/magang",
  },
];

export const TemplatesSection: React.FC = () => {
  return (
    <section id="templates" className="py-16 sm:py-24 bg-gray-50 transition-colors dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Pilih Jenis Surat
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-slate-300">
            Tersedia berbagai template surat yang bisa disesuaikan dengan
            kebutuhan Anda
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {TEMPLATES.map((template) => (
            <motion.div
              key={template.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
