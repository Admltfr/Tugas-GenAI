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
  tandaTangan: string;
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

  if (!data.tandaTangan) {
    errors.tandaTangan = "Tanda tangan wajib diunggah";
  }

  return errors;
};

export const validateLamaranForm = (data: {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
  tandaTangan: string;
  posisiDilamar: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  sumberLowongan: string;
  alasanMelamar: string;
}): ValidationError => {
  const errors = validateBiodataForm(data);

  if (!data.posisiDilamar.trim()) {
    errors.posisiDilamar = "Posisi yang dilamar wajib diisi";
  }

  if (!data.namaPerusahaan.trim()) {
    errors.namaPerusahaan = "Nama perusahaan wajib diisi";
  }

  if (!data.alamatPerusahaan.trim()) {
    errors.alamatPerusahaan = "Alamat perusahaan wajib diisi";
  }

  if (!data.sumberLowongan.trim()) {
    errors.sumberLowongan = "Sumber lowongan wajib diisi";
  }

  if (!data.alasanMelamar.trim()) {
    errors.alasanMelamar = "Alasan melamar wajib diisi";
  }

  return errors;
};

export const validateMagangForm = (data: {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
  tandaTangan: string;
  universitas: string;
  jurusan: string;
  semester: string;
  tujuanMagang: string;
  lamaMagang: string;
  namaPerusahaanTujuan: string;
}): ValidationError => {
  const errors = validateBiodataForm(data);

  if (!data.universitas.trim()) {
    errors.universitas = "Universitas wajib diisi";
  }

  if (!data.jurusan.trim()) {
    errors.jurusan = "Jurusan wajib diisi";
  }

  if (!data.semester.trim()) {
    errors.semester = "Semester wajib diisi";
  }

  if (!data.tujuanMagang.trim()) {
    errors.tujuanMagang = "Tujuan magang wajib diisi";
  }

  if (!data.lamaMagang.trim()) {
    errors.lamaMagang = "Lama magang wajib diisi";
  }

  if (!data.namaPerusahaanTujuan.trim()) {
    errors.namaPerusahaanTujuan = "Nama perusahaan tujuan wajib diisi";
  }

  return errors;
};
