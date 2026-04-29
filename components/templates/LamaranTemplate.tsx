import React from "react";
import type { LamaranForm } from "@/types";
import {
  LetterShell,
  LetterDate,
  LetterMeta,
  LetterRecipient,
  Paragraph,
  DataRow,
  SignatureBlock,
  formatDate,
} from "../preview/LetterComponents";

export const LamaranTemplate = ({ data }: { data: LamaranForm }) => (
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
