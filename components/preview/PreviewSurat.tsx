"use client";

import React from "react";
import { useFormContext } from "@/context/FormContext";
import type { LamaranForm, MagangForm } from "@/types";
import { LamaranTemplate } from "../templates/LamaranTemplate";
import { MagangTemplate } from "../templates/MagangTemplate";

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
