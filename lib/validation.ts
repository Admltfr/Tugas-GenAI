export interface ValidationError {
  [key: string]: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateBiodataForm = (data: {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
}): ValidationError => {
  const errors: ValidationError = {};

  if (!data.namaLengkap.trim()) {
    errors.namaLengkap = "Nama lengkap wajib diisi";
  }

  if (!data.tempatLahir.trim()) {
    errors.tempatLahir = "Tempat lahir wajib diisi";
  }

  if (!data.tanggalLahir) {
    errors.tanggalLahir = "Tanggal lahir wajib diisi";
  } else if (!validateDate(data.tanggalLahir)) {
    errors.tanggalLahir = "Format tanggal tidak valid";
  }

  if (!data.alamat.trim()) {
    errors.alamat = "Alamat wajib diisi";
  }

  if (!data.email.trim()) {
    errors.email = "Email wajib diisi";
  } else if (!validateEmail(data.email)) {
    errors.email = "Format email tidak valid";
  }

  if (!data.nomorTelepon.trim()) {
    errors.nomorTelepon = "Nomor telepon wajib diisi";
  } else if (!validatePhoneNumber(data.nomorTelepon)) {
    errors.nomorTelepon = "Nomor telepon hanya boleh berisi angka";
  }

  if (!data.pendidikanTerakhir.trim()) {
    errors.pendidikanTerakhir = "Pendidikan terakhir wajib diisi";
  }

  if (!data.deskripsiDiri.trim()) {
    errors.deskripsiDiri = "Deskripsi singkat diri wajib diisi";
  }

  return errors;
};
