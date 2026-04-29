"use client";

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
    <section id="templates" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pilih Jenis Surat
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tersedia berbagai template surat yang bisa disesuaikan dengan
            kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEMPLATES.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
};
