"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  InputField,
  TextAreaField,
  SelectField,
  DateField,
  SignatureUploadField,
} from "@/components/form";
import { validateLamaranForm } from "@/lib/validation";
import type { LamaranForm, ValidationError } from "@/types";
import { useFormContext } from "@/context/FormContext";
import { ConfirmModal } from "@/components/ui";

interface LamaranFormProps {
  title: string;
  onSubmit: (data: LamaranForm) => void;
}

const EDUCATION_OPTIONS = [
  { value: "sma", label: "SMA / SMK" },
  { value: "diploma", label: "Diploma (D3)" },
  { value: "sarjana", label: "Sarjana (S1)" },
  { value: "magister", label: "Magister (S2)" },
  { value: "doktor", label: "Doktor (S3)" },
];

export const LamaranFormComponent: React.FC<LamaranFormProps> = ({
  title,
  onSubmit,
}) => {
  const { state, dispatch, isHydrated } = useFormContext();
  const [formData, setFormData] = useState<LamaranForm>({
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    email: "",
    nomorTelepon: "",
    pendidikanTerakhir: "",
    deskripsiDiri: "",
    alamatPerusahaan: "",
    sumberLowongan: "",
    alasanMelamar: "",
    tandaTangan: "",
    posisiDilamar: "",
    namaPerusahaan: "",
  });

  const [errors, setErrors] = useState<ValidationError>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    if (isHydrated && state.lamaran) {
      const timer = setTimeout(() => {
        setFormData(state.lamaran as LamaranForm);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, state.lamaran]); // Only run once when hydrated

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_LAMARAN", payload: formData });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData, isHydrated, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLamaranForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut", delay: 0.06 }}
      className="bg-white rounded-xl shadow-lg p-8 transition-colors dark:bg-slate-900 dark:shadow-slate-950/30"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">{title}</h1>
      <p className="text-gray-600 mb-8 dark:text-slate-300">
        Lengkapi informasi lamaran kerja Anda di bawah ini dengan data yang akurat
        dan valid.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Data Perusahaan & Posisi */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 dark:text-white">
            🏢 Data Perusahaan & Posisi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Posisi yang Dilamar"
              name="posisiDilamar"
              value={formData.posisiDilamar}
              onChange={handleChange}
              error={errors.posisiDilamar}
              placeholder="Contoh: Software Engineer"
              required
            />
            <InputField
              label="Nama Perusahaan"
              name="namaPerusahaan"
              value={formData.namaPerusahaan}
              onChange={handleChange}
              error={errors.namaPerusahaan}
              placeholder="Contoh: PT Teknologi Nusantara"
              required
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Alamat Perusahaan"
              name="alamatPerusahaan"
              value={formData.alamatPerusahaan}
              onChange={handleChange}
              error={errors.alamatPerusahaan}
              placeholder="Contoh: Jl. Sudirman No. 1, Jakarta"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputField
              label="Sumber Lowongan"
              name="sumberLowongan"
              value={formData.sumberLowongan}
              onChange={handleChange}
              error={errors.sumberLowongan}
              placeholder="Contoh: LinkedIn, Website Perusahaan"
              required
            />
          </div>

          <div className="mt-6">
            <TextAreaField
              label="Alasan Melamar"
              name="alasanMelamar"
              value={formData.alasanMelamar}
              onChange={handleChange}
              error={errors.alasanMelamar}
              placeholder="Jelaskan alasan Anda melamar posisi ini di perusahaan tersebut."
              rows={4}
              required
            />
          </div>
        </div>

        {/* Section 2: Data Pribadi */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 dark:text-white">
            📋 Data Pribadi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Nama Lengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              error={errors.namaLengkap}
              placeholder="Contoh: Budi Santoso"
              required
            />
            <InputField
              label="Tempat Lahir"
              name="tempatLahir"
              value={formData.tempatLahir}
              onChange={handleChange}
              error={errors.tempatLahir}
              placeholder="Contoh: Jakarta"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <DateField
              label="Tanggal Lahir"
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleChange}
              error={errors.tanggalLahir}
              required
            />
            <SelectField
              label="Pendidikan Terakhir"
              name="pendidikanTerakhir"
              value={formData.pendidikanTerakhir}
              onChange={handleChange}
              error={errors.pendidikanTerakhir}
              options={EDUCATION_OPTIONS}
              required
            />
          </div>
        </div>

        {/* Section 3: Informasi Kontak */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 dark:text-white">
            📞 Informasi Kontak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Contoh: budi@email.com"
              required
            />
            <InputField
              label="Nomor Telepon"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleChange}
              error={errors.nomorTelepon}
              placeholder="Contoh: 08123456789"
              required
            />
          </div>

          <div className="mt-6">
            <InputField
              label="Alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              error={errors.alamat}
              placeholder="Contoh: Jl. Merdeka No. 123, Jakarta Pusat"
              required
            />
          </div>
        </div>

        {/* Section 4: Deskripsi Diri */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 dark:text-white">
            ✨ Deskripsi Diri
          </h2>
          <TextAreaField
            label="Deskripsi Singkat Diri"
            name="deskripsiDiri"
            value={formData.deskripsiDiri}
            onChange={handleChange}
            error={errors.deskripsiDiri}
            placeholder="Ceritakan tentang diri Anda, pengalaman, keahlian, dan motivasi Anda. Minimal 50 karakter."
            rows={6}
            required
          />
          <p className="text-sm text-gray-500 mt-2 dark:text-slate-400">
            Jumlah karakter: {formData.deskripsiDiri.length}
          </p>
        </div>

        {/* Section 5: Tanda Tangan */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 dark:text-white">
            ✍️ Tanda Tangan
          </h2>
          <SignatureUploadField
            label="Unggah Tanda Tangan"
            name="tandaTangan"
            value={formData.tandaTangan}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, tandaTangan: val }));
              if (errors.tandaTangan) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.tandaTangan;
                  return newErrors;
                });
              }
            }}
            error={errors.tandaTangan}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-4 pt-8 border-t border-gray-200 dark:border-slate-700">
          {isSubmitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">
                ✓ Formulir terkirim! Surat Anda sedang disiapkan...
              </p>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-md hover:shadow-lg"
          >
            {isSubmitted ? "✓ Lanjut ke Pratinjau Surat" : "Buat Surat"}
          </button>
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Reset Form
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Formulir?"
        message="Semua data yang telah Anda isi akan dihapus dan tidak dapat dikembalikan. Anda yakin ingin melanjutkan?"
        confirmText="Ya, Hapus Data"
        cancelText="Batal"
        onCancel={() => setIsResetModalOpen(false)}
        onConfirm={() => {
          const emptyForm = {
            namaLengkap: "",
            tempatLahir: "",
            tanggalLahir: "",
            alamat: "",
            email: "",
            nomorTelepon: "",
            pendidikanTerakhir: "",
            deskripsiDiri: "",
            alamatPerusahaan: "",
            sumberLowongan: "",
            alasanMelamar: "",
            tandaTangan: "",
            posisiDilamar: "",
            namaPerusahaan: "",
          };
          setFormData(emptyForm);
          setErrors({});
          setIsSubmitted(false);
          setIsResetModalOpen(false);
          dispatch({ type: "SET_LAMARAN", payload: emptyForm });
        }}
      />
    </motion.div>
  );
};
