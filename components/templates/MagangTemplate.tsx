import React from "react";
import type { MagangForm } from "@/types";
import {
  LetterShell,
  LetterDate,
  LetterMeta,
  LetterRecipient,
  Paragraph,
  DataRow,
  SignatureBlock,
} from "../preview/LetterComponents";

export const MagangTemplate = ({ data }: { data: MagangForm }) => (
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
