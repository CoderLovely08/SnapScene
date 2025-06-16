// hooks/useExport.js
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

const resolveFieldValue = (obj, path) =>
  path.split(".").reduce((acc, part) => acc && acc[part], obj) ?? "";

export const useExport = ({ data = [], columns = [], filename = "export" }) => {
  const exportToCSV = () => {
    const headers = columns.map((col) => col.header);
    const rows = data.map((item) =>
      columns.map((col) => resolveFieldValue(item, col.field))
    );

    const csv = Papa.unparse({ fields: headers, data: rows });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = [columns.map((col) => col.header)];
    const body = data.map((item) =>
      columns.map((col) => resolveFieldValue(item, col.field))
    );

    autoTable(doc, {
      head: headers,
      body: body,
    });

    doc.save(`${filename}.pdf`);
  };

  const exportToPrint = () => {
    const headers = columns.map((col) => col.header);
    const rows = data.map((item) =>
      columns.map((col) => resolveFieldValue(item, col.field))
    );

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const documentContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename} - Print</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            h1 { font-size: 20px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${filename}</h1>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) =>
                    `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    // Use DOM APIs instead of document.write
    printWindow.document.open();
    printWindow.document.write(documentContent);
    printWindow.document.close();
  };

  return {
    exportToCSV,
    exportToPDF,
    exportToPrint,
  };
};
