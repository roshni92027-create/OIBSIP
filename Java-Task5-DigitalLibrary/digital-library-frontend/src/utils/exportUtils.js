import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Export data to CSV file and trigger browser download.
 * @param {string} filename - Name of the output CSV file
 * @param {Array<string>} headers - Header row column titles
 * @param {Array<Array<any>>} rows - Data rows
 */
export const exportToCSV = (filename, headers, rows) => {
  const csvRows = [];
  const formatCell = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  csvRows.push(headers.map(formatCell).join(","));
  for (const row of rows) {
    csvRows.push(row.map(formatCell).join(","));
  }

  const blob = new Blob(["\uFEFF" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export data to a styled PDF report and trigger browser download.
 * @param {string} title - Report title
 * @param {Array<string>} headers - Table header titles
 * @param {Array<Array<any>>} rows - Table data rows
 * @param {string} filename - Name of output PDF file
 * @param {string} subtitle - Optional subtitle or metadata summary
 */
export const exportToPDF = (title, headers, rows, filename, subtitle = "") => {
  const doc = new jsPDF();

  // Document Title Header
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text(title, 14, 20);

  // Date and Subtitle
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const timestamp = `Generated on: ${new Date().toLocaleString()}`;
  doc.text(timestamp, 14, 27);
  if (subtitle) {
    doc.text(subtitle, 14, 33);
  }

  const startTableY = subtitle ? 38 : 32;

  // Draw separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, startTableY - 3, 196, startTableY - 3);

  // Table
  autoTable(doc, {
    startY: startTableY,
    head: [headers],
    body: rows,
    theme: "striped",
    headStyles: {
      fillColor: [13, 110, 253], // Primary Blue
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
};
