export const exportToPDF = async (element: HTMLElement, fileName: string) => {
  // Use dynamic import for html2pdf.js since it depends on the window object
  const html2pdf = (await import("html2pdf.js")).default;

  const copyComputedStyles = (sourceNode: Element, targetNode: Element) => {
    if (targetNode instanceof HTMLElement) {
      const computedStyle =
        sourceNode.ownerDocument.defaultView?.getComputedStyle(sourceNode);

      if (computedStyle) {
        targetNode.style.cssText = "";

        for (let index = 0; index < computedStyle.length; index += 1) {
          const propertyName = computedStyle.item(index);
          const propertyValue = computedStyle.getPropertyValue(propertyName);
          const propertyPriority =
            computedStyle.getPropertyPriority(propertyName);

          if (propertyValue) {
            targetNode.style.setProperty(
              propertyName,
              propertyValue,
              propertyPriority,
            );
          }
        }
      }
    }

    const sourceChildren = Array.from(sourceNode.children);
    const targetChildren = Array.from(targetNode.children);

    sourceChildren.forEach((sourceChild, index) => {
      const targetChild = targetChildren[index];

      if (sourceChild && targetChild) {
        copyComputedStyles(sourceChild, targetChild);
      }
    });
  };

  // The element to be exported is a letter inside the DOM
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${fileName}.pdf`,
    image: { type: "jpeg" as const, quality: 1 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      logging: false,
      onclone: (clonedDocument: Document) => {
        const clonedElement = clonedDocument.querySelector(
          "[data-letter-document]",
        );

        clonedDocument
          .querySelectorAll("link[rel='stylesheet'], style")
          .forEach((node) => {
            node.remove();
          });

        clonedDocument.documentElement.style.background = "#ffffff";
        clonedDocument.documentElement.style.colorScheme = "light";
        clonedDocument.body.style.margin = "0";
        clonedDocument.body.style.background = "#ffffff";

        if (clonedElement) {
          copyComputedStyles(element, clonedElement);
        }
      },
    },
    jsPDF: {
      unit: "mm" as const,
      format: "a4" as const,
      orientation: "portrait" as const,
    },
  };

  await html2pdf().from(element).set(opt).save();
};
