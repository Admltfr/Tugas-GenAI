"use client";

import { motion } from "framer-motion";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "✨",
      title: "Desain Modern",
      description:
        "Antarmuka yang intuitif dan mudah digunakan untuk semua kalangan",
    },
    {
      icon: "⚙️",
      title: "Customizable",
      description:
        "Sesuaikan surat dengan informasi dan kebutuhan Anda dengan mudah",
    },
    {
      icon: "📥",
      title: "Download Mudah",
      description: "Unduh surat dalam format yang siap untuk dikirimkan",
    },
    {
      icon: "🔐",
      title: "Aman & Privat",
      description:
        "Data Anda tidak disimpan di server, semuanya berjalan lokal",
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Bekerja sempurna di desktop, tablet, dan perangkat mobile",
    },
    {
      icon: "⚡",
      title: "Cepat & Efisien",
      description:
        "Proses yang singkat tanpa perlu bergabung atau login terlebih dahulu",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white transition-colors dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Fitur Unggulan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-slate-300">
            Semua yang Anda butuhkan untuk membuat surat profesional dengan
            mudah
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all dark:border-slate-800 dark:hover:border-blue-500"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
