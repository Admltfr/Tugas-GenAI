export interface BiodataForm {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
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
