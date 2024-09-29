import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const PDFDownloadButton = () => {
  const generatePDF = async () => {
    const formData = JSON.parse(localStorage.getItem('profileFormData'));
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    let yOffset = height - 50;

    // Embed the font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const addText = (text, fontSize = 12, isBold = false) => {
      page.drawText(text, {
        x: 50,
        y: yOffset,
        size: fontSize,
        font: isBold ? helveticaBoldFont : helveticaFont,
        color: rgb(0, 0, 0),
      });
      yOffset -= fontSize + 5;
    };

    addText('Profile Information', 18, true);
    yOffset -= 10;

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        addText(`${key}: ${value}`);
      }
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'profile_information.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;