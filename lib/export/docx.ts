import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ImageRun,
} from "docx";
import type { LamaranForm, MagangForm } from "@/types";

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

const createEmptyBorders = () => ({
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
});

const createDataRow = (label: string, value: string) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ text: label })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
      }),
      new TableCell({
        children: [new Paragraph({ text: ":" })],
        width: { size: 2, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
      }),
      new TableCell({
        children: [new Paragraph({ text: value })],
        width: { size: 73, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
      }),
    ],
  });
};

const getBase64Buffer = (base64: string) => {
  try {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
};

export const exportToDocx = async (
  type: "lamaran" | "magang",
  data: any,
  fileName: string
) => {
  let docChildren: any[] = [];

  const dateStr = `Bandung, ${formatDate(new Date().toISOString())}`;
  
  // Header / Date
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun(dateStr)],
      spacing: { after: 400 },
    })
  );

  if (type === "lamaran") {
    const d = data as LamaranForm;
    // Perihal
    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
        rows: [
          createDataRow("Lampiran", "1 berkas"),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "Perihal" })],
                width: { size: 25, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
              new TableCell({
                children: [new Paragraph({ text: ":" })],
                width: { size: 2, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Lamaran Pekerjaan sebagai ${d.posisiDilamar || "[Posisi yang Dilamar]"}`,
                        bold: true,
                      }),
                    ],
                  }),
                ],
                width: { size: 73, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ spacing: { after: 400 } })
    );

    // Kepada Yth
    docChildren.push(
      new Paragraph({ text: "Kepada Yth." }),
      new Paragraph({ text: "Bapak/Ibu Pimpinan HRD" }),
      new Paragraph({
        children: [
          new TextRun({
            text: (d.namaPerusahaan || "[Nama Perusahaan]").toUpperCase(),
            bold: true,
          }),
        ],
      }),
      new Paragraph({ text: d.alamatPerusahaan || "[Alamat Perusahaan]" }),
      new Paragraph({ text: "di tempat", spacing: { after: 400 } })
    );

    docChildren.push(
      new Paragraph({ text: "Dengan hormat,", spacing: { after: 200 } }),
      new Paragraph({
        text: `Berdasarkan informasi lowongan pekerjaan yang saya peroleh dari ${d.sumberLowongan || "[Sumber Lowongan]"}, dengan ini saya mengajukan lamaran pekerjaan untuk posisi ${d.posisiDilamar || "[Posisi]"} pada ${d.namaPerusahaan || "[Perusahaan]"}.`,
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({ text: "Adapun identitas diri saya adalah sebagai berikut:" }),
      new Table({
        width: { size: 90, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
        margins: { left: 720 },
        rows: [
          createDataRow("Nama", d.namaLengkap || "[Nama Lengkap]"),
          createDataRow(
            "Tempat, Tanggal Lahir",
            `${d.tempatLahir || "[Tempat]"}, ${formatDate(d.tanggalLahir) || "[Tanggal Lahir]"}`
          ),
          createDataRow("Pendidikan Terakhir", (d.pendidikanTerakhir || "[Pendidikan]").toUpperCase()),
          createDataRow("Alamat", d.alamat || "[Alamat]"),
          createDataRow("Nomor Telepon", d.nomorTelepon || "[No. Telp]"),
          createDataRow("Email", d.email || "[Email]"),
        ],
      }),
      new Paragraph({ spacing: { after: 200 } }),
      new Paragraph({
        text: `Saya memiliki latar belakang pendidikan, kemampuan, dan motivasi yang relevan dengan posisi tersebut. ${d.deskripsiDiri || "[Deskripsi]"}.`,
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Saya tertarik melamar posisi ini karena ${d.alasanMelamar || "[Alasan]"}. Saya berharap dapat memberikan kontribusi yang baik serta berkembang bersama perusahaan yang Bapak/Ibu pimpin.`,
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "Sebagai bahan pertimbangan, bersama surat ini saya lampirkan berkas pendukung yang diperlukan. Besar harapan saya agar Bapak/Ibu berkenan memberikan kesempatan kepada saya untuk mengikuti tahap seleksi atau wawancara sehingga saya dapat menjelaskan lebih lanjut mengenai potensi dan kualifikasi yang saya miliki.",
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "Demikian surat lamaran pekerjaan ini saya sampaikan. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.",
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 400 },
      })
    );
  } else {
    const d = data as MagangForm;
    // Magang specific
    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
        rows: [
          createDataRow("Lampiran", "1 berkas"),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "Perihal" })],
                width: { size: 25, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
              new TableCell({
                children: [new Paragraph({ text: ":" })],
                width: { size: 2, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Permohonan Magang",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                width: { size: 73, type: WidthType.PERCENTAGE },
                borders: createEmptyBorders(),
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ spacing: { after: 400 } })
    );

    docChildren.push(
      new Paragraph({ text: "Kepada Yth." }),
      new Paragraph({ text: "Bapak/Ibu Pimpinan / HRD" }),
      new Paragraph({
        children: [
          new TextRun({
            text: (d.namaPerusahaanTujuan || "[Nama Perusahaan]").toUpperCase(),
            bold: true,
          }),
        ],
      }),
      new Paragraph({ text: "di tempat", spacing: { after: 400 } })
    );

    docChildren.push(
      new Paragraph({ text: "Dengan hormat,", spacing: { after: 200 } }),
      new Paragraph({ text: "Saya yang bertanda tangan di bawah ini:" }),
      new Table({
        width: { size: 90, type: WidthType.PERCENTAGE },
        borders: createEmptyBorders(),
        margins: { left: 720 },
        rows: [
          createDataRow("Nama", d.namaLengkap || "[Nama Lengkap]"),
          createDataRow("Universitas / Instansi", d.universitas || "[Universitas]"),
          createDataRow("Program Studi / Jurusan", d.jurusan || "[Jurusan]"),
          createDataRow("Semester", d.semester || "[Semester]"),
          createDataRow("No. Telepon", d.nomorTelepon || "[No. Telp]"),
          createDataRow("Email", d.email || "[Email]"),
        ],
      }),
      new Paragraph({ spacing: { after: 200 } }),
      new Paragraph({
        text: `Melalui surat ini, saya mengajukan permohonan kepada Bapak/Ibu agar dapat diberikan kesempatan untuk melaksanakan kegiatan magang ${d.tujuanMagang || "[Tujuan Magang]"} di ${d.namaPerusahaanTujuan || "[Nama Perusahaan]"} selama ${d.lamaMagang || "[Durasi]"}.`,
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Kegiatan magang ini saya ajukan sebagai bagian dari pengembangan kompetensi akademik dan profesional, sekaligus sebagai sarana untuk memperoleh pengalaman kerja secara langsung sesuai bidang yang saya pelajari. ${d.deskripsiDiri || "[Deskripsi]"}.`,
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "Selama mengikuti kegiatan magang, saya bersedia mematuhi seluruh peraturan, tata tertib, dan ketentuan yang berlaku di perusahaan. Saya juga berkomitmen untuk menjaga nama baik universitas/instansi serta memberikan kontribusi positif sesuai arahan dan kebutuhan perusahaan.",
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "Sebagai bahan pertimbangan, bersama surat ini saya lampirkan berkas pendukung yang diperlukan. Besar harapan saya agar Bapak/Ibu berkenan menerima permohonan magang ini.",
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "Demikian surat permohonan magang ini saya sampaikan. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.",
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 720 },
        spacing: { after: 400 },
      })
    );
  }

  // Signature Block
  const sigBuffer = data.tandaTangan ? getBase64Buffer(data.tandaTangan) : null;
  const signatureParagraph = new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: "Hormat saya," })],
  });
  
  const nameParagraph = new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({
        text: data.namaLengkap || "[Nama Lengkap]",
        bold: true,
      }),
    ],
  });

  docChildren.push(signatureParagraph);
  
  if (sigBuffer) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new ImageRun({
            data: sigBuffer,
            transformation: { width: 150, height: 90 },
            type: "png"
          }),
        ],
      })
    );
  } else {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 800, after: 800 },
        children: [
          new TextRun({ text: "[Tanda Tangan]", italics: true }),
        ],
      })
    );
  }

  docChildren.push(nameParagraph);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch margins
          },
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.docx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
