"use client";

import { useState, useEffect } from "react";
import {
  InputField,
  TextAreaField,
  SelectField,
  DateField,
  SignatureUploadField,
} from "@/components/form";
import { validateMagangForm } from "@/lib/validation";
import type { MagangForm, ValidationError } from "@/types";
import { useFormContext } from "@/context/FormContext";
import { ConfirmModal } from "@/components/ui";

interface MagangFormProps {
  title: string;
  onSubmit: (data: MagangForm) => void;
}

const EDUCATION_OPTIONS = [
  { value: "sma", label: "SMA / SMK" },
  { value: "diploma", label: "Diploma (D3)" },
  { value: "sarjana", label: "Sarjana (S1)" },
  { value: "magister", label: "Magister (S2)" },
  { value: "doktor", label: "Doktor (S3)" },
];

export const MagangFormComponent: React.FC<MagangFormProps> = ({
  title,
  onSubmit,
}) => {
  const { state, dispatch, isHydrated } = useFormContext();
  const [formData, setFormData] = useState<MagangForm>({
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    email: "",
    nomorTelepon: "",
    pendidikanTerakhir: "",
    deskripsiDiri: "",
    universitas: "",
    jurusan: "",
    semester: "",
    tujuanMagang: "",
    lamaMagang: "",
    namaPerusahaanTujuan: "",
    tandaTangan: "",
  });

  const [errors, setErrors] = useState<ValidationError>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    if (isHydrated && state.magang) {
      setFormData(state.magang);
    }
  }, [isHydrated]); // Only run once when hydrated

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_MAGANG", payload: formData });
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
    const validationErrors = validateMagangForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-8">
        Lengkapi informasi permohonan magang Anda di bawah ini dengan data yang
        akurat dan valid.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Data Akademik & Magang */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            🎓 Data Akademik & Magang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Universitas / Instansi Pendidikan"
              name="universitas"
              value={formData.universitas}
              onChange={handleChange}
              error={errors.universitas}
              placeholder="Contoh: Universitas Indonesia"
              required
            />
            <InputField
              label="Program Studi / Jurusan"
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              error={errors.jurusan}
              placeholder="Contoh: Ilmu Komputer"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputField
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              error={errors.semester}
              placeholder="Contoh: 6"
              required
            />
            <InputField
              label="Nama Perusahaan Tujuan"
              name="namaPerusahaanTujuan"
              value={formData.namaPerusahaanTujuan}
              onChange={handleChange}
              error={errors.namaPerusahaanTujuan}
              placeholder="Contoh: PT Teknologi Maju"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputField
              label="Tujuan Magang"
              name="tujuanMagang"
              value={formData.tujuanMagang}
              onChange={handleChange}
              error={errors.tujuanMagang}
              placeholder="Contoh: Praktik Kerja Lapangan (PKL)"
              required
            />
            <InputField
              label="Lama Magang"
              name="lamaMagang"
              value={formData.lamaMagang}
              onChange={handleChange}
              error={errors.lamaMagang}
              placeholder="Contoh: 3 Bulan"
              required
            />
          </div>
        </div>

        {/* Section 2: Data Pribadi */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
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
          <p className="text-sm text-gray-500 mt-2">
            Jumlah karakter: {formData.deskripsiDiri.length}
          </p>
        </div>

        {/* Section 5: Tanda Tangan */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
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
        <div className="flex flex-col gap-4 pt-8 border-t border-gray-200">
          {isSubmitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">
                ✓ Formulir terkirim! Surat Anda sedang disiapkan...
              </p>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold text-lg shadow-md hover:shadow-lg"
          >
            {isSubmitted ? "✓ Lanjut ke Pratinjau Surat" : "Buat Surat"}
          </button>
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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
            universitas: "",
            jurusan: "",
            semester: "",
            tujuanMagang: "",
            lamaMagang: "",
            namaPerusahaanTujuan: "",
            tandaTangan: "",
          };
          setFormData(emptyForm);
          setErrors({});
          setIsSubmitted(false);
          setIsResetModalOpen(false);
          dispatch({ type: "SET_MAGANG", payload: emptyForm });
        }}
      />
    </div>
  );
};
