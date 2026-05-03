import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateInvoicePDF(invoice, space, user, payment) {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(209, 32, 38); // Primary red
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('JAFFA CoWork', 14, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Factura Electrónica', 150, 20);
  doc.text(`ID: #${invoice._id.slice(-8).toUpperCase()}`, 150, 26);
  
  // Body - Info
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Cobrado a:', 14, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Usuario: ${user.email}`, 14, 62);
  doc.text(`Fecha de emisión: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 68);
  doc.text(`Método de Pago: ${payment?.metodo_pago || 'Tarjeta'}`, 14, 74);
  
  // Table
  const tableColumn = ["Descripción", "Cant. Horas", "Precio x Hora", "Total"];
  const tableRows = [
    [
      `${space.nombre} - Reserva ${new Date(invoice.createdAt).toLocaleDateString()}`,
      `${invoice.cantidad_horas.toFixed(1)} hrs`,
      `$${invoice.precio_por_hora.toLocaleString()}`,
      `$${invoice.monto_total.toLocaleString()}`
    ]
  ];

  autoTable(doc, {
    startY: 85,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [209, 32, 38] },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // Footer / Totals
  const finalY = doc.lastAutoTable.finalY || 100;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Total Pagado: $${invoice.monto_total.toLocaleString()}`, 140, finalY + 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('Gracias por preferir JAFFA CoWork. Para soporte, contáctenos en soporte@jaffa.com', 14, 280);

  doc.save(`Factura_JAFFA_${invoice._id.slice(-6)}.pdf`);
}
