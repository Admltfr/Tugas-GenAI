export const exportToPDF = async (element: HTMLElement, fileName: string) => {
  // Use dynamic import for html2pdf.js since it depends on the window object
  const html2pdf = (await import("html2pdf.js")).default;

  // The element to be exported is a letter inside the DOM
  const opt = {
    margin: 0,
    filename: `${fileName}.pdf`,
    image: { type: "jpeg" as const, quality: 1 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
  };

  await html2pdf().from(element).set(opt).save();
};
