"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LetterTemplateType } from "@/types";

interface TemplateCardProps {
  template: LetterTemplateType;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-colors duration-300 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500"
    >
      <div className="text-5xl mb-4">{template.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
        {template.name}
      </h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed dark:text-slate-300">
        {template.description}
      </p>
      <Link
        href={template.route}
        className="inline-block w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-md transition-all font-medium text-center group-hover:from-blue-700 group-hover:to-blue-800"
      >
        Pilih Template
      </Link>
    </motion.div>
  );
};
