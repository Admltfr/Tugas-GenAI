import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
};

export const LetterShell = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.985 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="h-full max-h-[880px] overflow-auto rounded-lg border border-slate-200 bg-slate-200/70 p-4 shadow-inner transition-colors sm:p-6 dark:border-slate-700 dark:bg-slate-900 print:h-auto print:max-h-none print:overflow-visible print:border-none print:bg-transparent print:p-0 print:shadow-none"
  >
    <motion.article
      data-letter-document
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
      className="mx-auto min-h-[297mm] w-[210mm] bg-white px-[24mm] pb-[22mm] pt-[20mm] font-['Times_New_Roman',Times,serif] text-[12pt] leading-[1.5] text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.22)] ring-1 ring-slate-300 print:m-0 print:min-h-0 print:w-full print:shadow-none print:ring-0"
    >
      <div className="min-h-[255mm] print:min-h-0">{children}</div>
    </motion.article>
  </motion.div>
);

export const LetterDate = () => (
  <div className="mb-8 text-right">
    <p>Bandung, {formatDate(new Date().toISOString())}</p>
  </div>
);

export const LetterRecipient = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="mb-8 space-y-0.5">{children}</div>;

export const LetterMeta = ({
  subject,
  attachment = "-",
}: {
  subject: string;
  attachment?: string;
}) => (
  <table className="mb-8 w-full border-separate border-spacing-0">
    <tbody>
      <DataRow label="Lampiran" labelClassName="w-[22mm]">
        {attachment}
      </DataRow>
      <DataRow label="Perihal" labelClassName="w-[22mm]" valueClassName="font-semibold">
        {subject}
      </DataRow>
    </tbody>
  </table>
);

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-justify indent-[12mm]">{children}</p>
);

export const DataRow = ({
  label,
  children,
  valueClassName = "",
  labelClassName = "w-[45mm]",
}: {
  label: string;
  children: React.ReactNode;
  valueClassName?: string;
  labelClassName?: string;
}) => (
  <tr>
    <td className={`py-0.5 pr-2 align-top ${labelClassName}`}>{label}</td>
    <td className="w-[4mm] py-0.5 pr-2 align-top">:</td>
    <td className={`py-0.5 align-top ${valueClassName}`}>{children}</td>
  </tr>
);

export const SignatureBlock = ({
  name,
  signature,
}: {
  name: string;
  signature: string;
}) => (
  <div className="mt-10 flex justify-end">
    <div className="w-[55mm] text-left">
      <p>Hormat saya,</p>
      <div className="my-2 flex h-[25mm] w-[42mm] items-center justify-center">
        {signature ? (
          <Image
            src={signature}
            alt="Tanda Tangan"
            width={160}
            height={96}
            unoptimized
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        ) : (
          <span className="text-[10pt] italic text-slate-300 print:hidden">[Tanda Tangan]</span>
        )}
      </div>
      <p className="font-semibold">
        {name || "[Nama Lengkap]"}
      </p>
    </div>
  </div>
);
