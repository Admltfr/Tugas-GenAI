"use client";

import Link from "next/link";
import type { LetterTemplateType } from "@/types";

interface TemplateCardProps {
  template: LetterTemplateType;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-1">
      <div className="text-5xl mb-4">{template.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {template.name}
      </h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {template.description}
      </p>
      <Link
        href={template.route}
        className="inline-block w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all font-medium text-center group-hover:from-blue-700 group-hover:to-blue-800"
      >
        Pilih Template
      </Link>
    </div>
  );
};
