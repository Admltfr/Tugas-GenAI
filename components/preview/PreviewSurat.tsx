"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "@/context/FormContext";
import type { LamaranForm, MagangForm } from "@/types";

interface PreviewSuratProps {
  type: "lamaran" | "magang";
}

const defaultLamaranData: LamaranForm = {
  namaLengkap: "",
  tempatLahir: "",
  tanggalLahir: "",
  alamat: "",
  email: "",
  nomorTelepon: "",
  pendidikanTerakhir: "",
  deskripsiDiri: "",
  tandaTangan: "",
  posisiDilamar: "",
  namaPerusahaan: "",
  alamatPerusahaan: "",
  sumberLowongan: "",
  alasanMelamar: "",
};

const defaultMagangData: MagangForm = {
  namaLengkap: "",
  tempatLahir: "",
  tanggalLahir: "",
  alamat: "",
  email: "",
  nomorTelepon: "",
  pendidikanTerakhir: "",
  deskripsiDiri: "",
  tandaTangan: "",
  universitas: "",
  jurusan: "",
  semester: "",
  tujuanMagang: "",
  lamaMagang: "",
  namaPerusahaanTujuan: "",
};

const formatDate = (dateString: string) => {
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

const LetterShell = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.985 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="h-full max-h-[880px] overflow-auto rounded-lg border border-slate-200 bg-slate-200/70 p-4 shadow-inner transition-colors sm:p-6 dark:border-slate-700 dark:bg-slate-900"
  >
    <motion.article
      data-letter-document
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
      className="mx-auto min-h-[297mm] w-[210mm] bg-white px-[24mm] pb-[22mm] pt-[20mm] font-['Times_New_Roman',Times,serif] text-[12pt] leading-[1.5] text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.22)] ring-1 ring-slate-300 print:shadow-none print:ring-0"
    >
      <div className="min-h-[255mm]">{children}</div>
    </motion.article>
  </motion.div>
);

const LetterDate = () => (
  <div className="mb-8 text-right">
    <p>Bandung, {formatDate(new Date().toISOString())}</p>
  </div>
);

const LetterRecipient = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="mb-8 space-y-0.5">{children}</div>;

const LetterMeta = ({
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

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-justify indent-[12mm]">{children}</p>
);

const DataRow = ({
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

const SignatureBlock = ({
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
          <span className="text-[10pt] italic text-slate-300">[Tanda Tangan]</span>
        )}
      </div>
      <p className="font-semibold">
        {name || "[Nama Lengkap]"}
      </p>
    </div>
  </div>
);

const LamaranTemplate = ({ data }: { data: LamaranForm }) => (
  <LetterShell>
    <LetterDate />
    <LetterMeta
      attachment="1 berkas"
      subject={`Lamaran Pekerjaan sebagai ${data.posisiDilamar || "[Posisi yang Dilamar]"}`}
    />

    <LetterRecipient>
      <p>Kepada Yth.</p>
      <p>Bapak/Ibu Pimpinan HRD</p>
      <p className="font-semibold uppercase">
        {data.namaPerusahaan || "[Nama Perusahaan]"}
      </p>
      <p className="whitespace-pre-wrap">{data.alamatPerusahaan || "[Alamat Perusahaan]"}</p>
      <p>di tempat</p>
    </LetterRecipient>

    <div className="mb-4">
      <p>Dengan hormat,</p>
    </div>

    <Paragraph>
      Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari {data.sumberLowongan || "[Sumber Lowongan]"},
      dengan ini saya mengajukan lamaran pekerjaan untuk posisi
      <span className="font-semibold"> {data.posisiDilamar || "[Posisi yang Dilamar]"}</span> pada
      <span className="font-semibold"> {data.namaPerusahaan || "[Nama Perusahaan]"}</span>.
    </Paragraph>

    <div className="mb-4">
      <p>Adapun identitas diri saya adalah sebagai berikut:</p>
      <table className="ml-[12mm] mt-2 w-[142mm] border-separate border-spacing-0">
        <tbody>
          <DataRow label="Nama" valueClassName="font-medium">{data.namaLengkap || "[Nama Lengkap]"}</DataRow>
          <DataRow label="Tempat, Tanggal Lahir">
            {data.tempatLahir || "[Tempat]"}, {formatDate(data.tanggalLahir) || "[Tanggal Lahir]"}
          </DataRow>
          <DataRow label="Pendidikan Terakhir" valueClassName="uppercase">{data.pendidikanTerakhir || "[Pendidikan]"}</DataRow>
          <DataRow label="Alamat">{data.alamat || "[Alamat]"}</DataRow>
          <DataRow label="Nomor Telepon">{data.nomorTelepon || "[No. Telp]"}</DataRow>
          <DataRow label="Email">{data.email || "[Email]"}</DataRow>
        </tbody>
      </table>
    </div>

    <Paragraph>
      Saya memiliki latar belakang pendidikan, kemampuan, dan motivasi yang relevan dengan posisi tersebut.
      {data.deskripsiDiri
        ? ` ${data.deskripsiDiri}`
        : " [Deskripsi singkat mengenai pengalaman, keterampilan, dan kelebihan pelamar]."}
    </Paragraph>

    <Paragraph>
      Saya tertarik melamar posisi ini karena {data.alasanMelamar || "[Alasan Melamar]"}.
      Saya berharap dapat memberikan kontribusi yang baik serta berkembang bersama perusahaan yang Bapak/Ibu pimpin.
    </Paragraph>

    <Paragraph>
      Sebagai bahan pertimbangan, bersama surat ini saya lampirkan berkas pendukung yang diperlukan.
      Besar harapan saya agar Bapak/Ibu berkenan memberikan kesempatan kepada saya untuk mengikuti tahap seleksi
      atau wawancara sehingga saya dapat menjelaskan lebih lanjut mengenai potensi dan kualifikasi yang saya miliki.
    </Paragraph>
    <Paragraph>
      Demikian surat lamaran pekerjaan ini saya sampaikan. Atas perhatian dan kesempatan yang diberikan,
      saya ucapkan terima kasih.
    </Paragraph>

    <SignatureBlock name={data.namaLengkap} signature={data.tandaTangan} />
  </LetterShell>
);

const MagangTemplate = ({ data }: { data: MagangForm }) => (
  <LetterShell>
    <LetterDate />
    <LetterMeta attachment="1 berkas" subject="Permohonan Magang" />

    <LetterRecipient>
      <p>Kepada Yth.</p>
      <p>Bapak/Ibu Pimpinan / HRD</p>
      <p className="font-semibold uppercase">
        {data.namaPerusahaanTujuan || "[Nama Perusahaan]"}
      </p>
      <p>di tempat</p>
    </LetterRecipient>

    <div className="mb-4">
      <p>Dengan hormat,</p>
    </div>

    <div className="mb-4">
      <p>
        Saya yang bertanda tangan di bawah ini:
      </p>
      <table className="ml-[12mm] mt-2 w-[142mm] border-separate border-spacing-0">
        <tbody>
          <DataRow label="Nama" valueClassName="font-medium">{data.namaLengkap || "[Nama Lengkap]"}</DataRow>
          <DataRow label="Universitas / Instansi">{data.universitas || "[Universitas]"}</DataRow>
          <DataRow label="Program Studi / Jurusan">{data.jurusan || "[Jurusan]"}</DataRow>
          <DataRow label="Semester">{data.semester || "[Semester]"}</DataRow>
          <DataRow label="No. Telepon">{data.nomorTelepon || "[No. Telp]"}</DataRow>
          <DataRow label="Email">{data.email || "[Email]"}</DataRow>
        </tbody>
      </table>
    </div>

    <Paragraph>
      Melalui surat ini, saya mengajukan permohonan kepada Bapak/Ibu agar dapat diberikan kesempatan
      untuk melaksanakan kegiatan magang
      <span className="font-semibold"> {data.tujuanMagang || "[Tujuan Magang]"}</span> di
      <span className="font-semibold"> {data.namaPerusahaanTujuan || "[Nama Perusahaan]"}</span>
      selama <span className="font-semibold">{data.lamaMagang || "[Durasi]"}</span>.
    </Paragraph>

    <Paragraph>
      Kegiatan magang ini saya ajukan sebagai bagian dari pengembangan kompetensi akademik dan profesional,
      sekaligus sebagai sarana untuk memperoleh pengalaman kerja secara langsung sesuai bidang yang saya pelajari.
      {data.deskripsiDiri
        ? ` ${data.deskripsiDiri}`
        : " [Deskripsi singkat mengenai motivasi, kemampuan, dan tujuan mengikuti program magang]."}
    </Paragraph>

    <Paragraph>
      Selama mengikuti kegiatan magang, saya bersedia mematuhi seluruh peraturan, tata tertib, dan ketentuan
      yang berlaku di perusahaan. Saya juga berkomitmen untuk menjaga nama baik universitas/instansi serta
      memberikan kontribusi positif sesuai arahan dan kebutuhan perusahaan.
    </Paragraph>
    <Paragraph>
      Sebagai bahan pertimbangan, bersama surat ini saya lampirkan berkas pendukung yang diperlukan.
      Besar harapan saya agar Bapak/Ibu berkenan menerima permohonan magang ini.
    </Paragraph>
    <Paragraph>
      Demikian surat permohonan magang ini saya sampaikan. Atas perhatian dan kesempatan yang diberikan,
      saya ucapkan terima kasih.
    </Paragraph>

    <SignatureBlock name={data.namaLengkap} signature={data.tandaTangan} />
  </LetterShell>
);

const letterTemplates = {
  lamaran: {
    getData: (state: ReturnType<typeof useFormContext>["state"]) =>
      state.lamaran ?? defaultLamaranData,
    render: (data: LamaranForm) => <LamaranTemplate data={data} />,
  },
  magang: {
    getData: (state: ReturnType<typeof useFormContext>["state"]) =>
      state.magang ?? defaultMagangData,
    render: (data: MagangForm) => <MagangTemplate data={data} />,
  },
};

export const PreviewSurat: React.FC<PreviewSuratProps> = ({ type }) => {
  const { state } = useFormContext();

  if (type === "lamaran") {
    const template = letterTemplates.lamaran;
    return template.render(template.getData(state));
  }

  const template = letterTemplates.magang;
  return template.render(template.getData(state));
};
