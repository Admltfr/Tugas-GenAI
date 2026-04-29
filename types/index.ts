export interface BiodataForm {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
  tandaTangan: string;
}

export interface ValidationError {
  [key: string]: string;
}

export interface LamaranForm extends BiodataForm {
  posisiDilamar: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  sumberLowongan: string;
  alasanMelamar: string;
}

export interface MagangForm extends BiodataForm {
  universitas: string;
  jurusan: string;
  semester: string;
  tujuanMagang: string;
  lamaMagang: string;
  namaPerusahaanTujuan: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface TextAreaFieldProps extends FormFieldProps {
  rows?: number;
}

export interface SelectFieldProps extends FormFieldProps {
  options: { value: string; label: string }[];
}

export interface DateFieldProps extends FormFieldProps {
  min?: string;
  max?: string;
}

export interface LetterTemplateType {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
}
