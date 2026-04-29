"use client";

import React from "react";
import { useFormContext } from "@/context/FormContext";
import type { LamaranForm, MagangForm } from "@/types";

interface PreviewSuratProps {
  type: "lamaran" | "magang";
}

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

export const PreviewSurat: React.FC<PreviewSuratProps> = ({ type }) => {
  const { state } = useFormContext();

  if (type === "lamaran") {
    const data = state.lamaran;
    if (!data) return <EmptyPreview />;

    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden p-8 font-serif text-sm md:text-base leading-relaxed text-gray-800 h-full max-h-[800px] overflow-y-auto">
        <div className="text-right mb-8">
          <p>{formatDate(new Date().toISOString())}</p>
        </div>

        <div className="mb-8">
          <p>Yth. HRD Manager</p>
          <p className="font-bold">{data.namaPerusahaan || "[Nama Perusahaan]"}</p>
          <p className="whitespace-pre-wrap">{data.alamatPerusahaan || "[Alamat Perusahaan]"}</p>
        </div>

        <div className="mb-4">
          <p>Dengan hormat,</p>
        </div>

        <div className="mb-4 text-justify">
          <p>
            Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari {data.sumberLowongan || "[Sumber Lowongan]"}, 
            bersama surat ini saya bermaksud mengajukan diri untuk melamar pekerjaan pada posisi 
            <span className="font-bold"> {data.posisiDilamar || "[Posisi yang Dilamar]"}</span> di perusahaan yang Bapak/Ibu pimpin.
          </p>
        </div>

        <div className="mb-4">
          <p>Berikut adalah data diri saya:</p>
          <table className="w-full mt-2 ml-4">
            <tbody>
              <tr>
                <td className="w-48 align-top">Nama</td>
                <td className="w-4 align-top">:</td>
                <td className="font-medium">{data.namaLengkap || "[Nama Lengkap]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Tempat, Tanggal Lahir</td>
                <td className="w-4 align-top">:</td>
                <td>
                  {data.tempatLahir || "[Tempat]"}, {formatDate(data.tanggalLahir) || "[Tanggal Lahir]"}
                </td>
              </tr>
              <tr>
                <td className="w-48 align-top">Pendidikan Terakhir</td>
                <td className="w-4 align-top">:</td>
                <td className="uppercase">{data.pendidikanTerakhir || "[Pendidikan]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Alamat</td>
                <td className="w-4 align-top">:</td>
                <td>{data.alamat || "[Alamat]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Nomor Telepon</td>
                <td className="w-4 align-top">:</td>
                <td>{data.nomorTelepon || "[No. Telp]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Email</td>
                <td className="w-4 align-top">:</td>
                <td>{data.email || "[Email]"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4 text-justify">
          <p>
            {data.deskripsiDiri || "[Deskripsi Diri]"}
          </p>
        </div>
        
        <div className="mb-4 text-justify">
          <p>
            Alasan saya melamar posisi ini adalah karena {data.alasanMelamar || "[Alasan Melamar]"}.
          </p>
        </div>

        <div className="mb-8 text-justify">
          <p>
            Besar harapan saya agar Bapak/Ibu bersedia meluangkan waktu untuk memberikan kesempatan wawancara, 
            sehingga saya dapat menjelaskan lebih rinci mengenai potensi yang saya miliki.
          </p>
          <p className="mt-2">
            Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.
          </p>
        </div>

        <div className="flex flex-col items-end mr-8">
          <p className="mb-2">Hormat saya,</p>
          <div className="h-24 w-32 flex items-center justify-center mb-2 border border-transparent hover:border-gray-200 rounded">
            {data.tandaTangan ? (
              <img src={data.tandaTangan} alt="Tanda Tangan" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            ) : (
              <span className="text-gray-300 text-xs italic">[Tanda Tangan]</span>
            )}
          </div>
          <p className="font-bold underline">{data.namaLengkap || "[Nama Lengkap]"}</p>
        </div>
      </div>
    );
  }

  if (type === "magang") {
    const data = state.magang;
    if (!data) return <EmptyPreview />;

    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden p-8 font-serif text-sm md:text-base leading-relaxed text-gray-800 h-full max-h-[800px] overflow-y-auto">
        <div className="text-right mb-8">
          <p>{formatDate(new Date().toISOString())}</p>
        </div>

        <div className="mb-8">
          <p>Yth. Pimpinan / HRD</p>
          <p className="font-bold">{data.namaPerusahaanTujuan || "[Nama Perusahaan]"}</p>
        </div>

        <div className="mb-4">
          <p>Dengan hormat,</p>
        </div>

        <div className="mb-4 text-justify">
          <p>
            Saya yang bertanda tangan di bawah ini:
          </p>
          <table className="w-full mt-2 ml-4">
            <tbody>
              <tr>
                <td className="w-48 align-top">Nama</td>
                <td className="w-4 align-top">:</td>
                <td className="font-medium">{data.namaLengkap || "[Nama Lengkap]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Universitas / Instansi</td>
                <td className="w-4 align-top">:</td>
                <td>{data.universitas || "[Universitas]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Program Studi / Jurusan</td>
                <td className="w-4 align-top">:</td>
                <td>{data.jurusan || "[Jurusan]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Semester</td>
                <td className="w-4 align-top">:</td>
                <td>{data.semester || "[Semester]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">No. Telepon</td>
                <td className="w-4 align-top">:</td>
                <td>{data.nomorTelepon || "[No. Telp]"}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">Email</td>
                <td className="w-4 align-top">:</td>
                <td>{data.email || "[Email]"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4 text-justify">
          <p>
            Bersama surat ini, saya bermaksud mengajukan permohonan untuk dapat melaksanakan kegiatan magang 
            <span className="font-bold"> {data.tujuanMagang || "[Tujuan Magang]"}</span> di perusahaan yang Bapak/Ibu pimpin 
            selama <span className="font-bold">{data.lamaMagang || "[Durasi]"}</span>.
          </p>
        </div>
        
        <div className="mb-4 text-justify">
          <p>
            {data.deskripsiDiri || "[Deskripsi / Motivasi Magang]"}
          </p>
        </div>

        <div className="mb-8 text-justify">
          <p>
            Besar harapan saya agar Bapak/Ibu berkenan menerima permohonan magang ini. 
            Saya berkomitmen untuk mematuhi semua peraturan yang berlaku di perusahaan dan memberikan kontribusi positif.
          </p>
          <p className="mt-2">
            Demikian surat permohonan magang ini saya sampaikan. Atas perhatian dan kesempatannya, saya ucapkan terima kasih.
          </p>
        </div>

        <div className="flex flex-col items-end mr-8">
          <p className="mb-2">Hormat saya,</p>
          <div className="h-24 w-32 flex items-center justify-center mb-2 border border-transparent hover:border-gray-200 rounded">
            {data.tandaTangan ? (
              <img src={data.tandaTangan} alt="Tanda Tangan" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            ) : (
              <span className="text-gray-300 text-xs italic">[Tanda Tangan]</span>
            )}
          </div>
          <p className="font-bold underline">{data.namaLengkap || "[Nama Lengkap]"}</p>
        </div>
      </div>
    );
  }

  return null;
};

const EmptyPreview = () => (
  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 h-full flex flex-col items-center justify-center text-gray-400">
    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <p className="text-lg font-medium">Pratinjau Surat</p>
    <p className="text-sm mt-2 text-center max-w-xs">Isi formulir di sebelah kiri untuk melihat tampilan surat Anda secara real-time di sini.</p>
  </div>
);
