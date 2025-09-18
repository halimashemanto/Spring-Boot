import { Component } from '@angular/core';
import { DischargeBillDTO } from '../model/dischargeBill.model';
import { DischargeBillService } from '../discharge-bill-service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-add-discharge-bill',
  standalone: false,
  templateUrl: './add-discharge-bill.html',
  styleUrl: './add-discharge-bill.css'
})
export class AddDischargeBill {

 bedBookingId!: number;
  dischargeDate!: string; 
  bill?: DischargeBillDTO;
  loading = false;
  errorMessage = '';

  constructor(private dischargeService: DischargeBillService) {}

  submit() {
    if (!this.bedBookingId || !this.dischargeDate) {
      this.errorMessage = 'Both BedBooking ID and Discharge Date are required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.bill = undefined;

    this.dischargeService.dischargePatient(this.bedBookingId, this.dischargeDate)
      .subscribe({
        next: data => {
          this.bill = data;
          this.loading = false;
        },
        error: err => {
          this.errorMessage = 'Could not fetch discharge details';
          this.loading = false;
        }
      });
  }






 downloadPDF() {
  if (!this.bill) return;

  const doc = new jsPDF();
 

  // ✅ Page Border
  doc.setDrawColor(0); // black
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277); // 10mm margin


// ✅ Header with rounded corners & subtle shadow
const headerX = 15;
const headerY = 15;
const headerWidth = 180;
const headerHeight = 40;
const borderRadius = 5;

// subtle shadow (light gray rectangle slightly offset)
doc.setFillColor(200, 200, 200, 50); // light gray with opacity
doc.roundedRect(headerX + 1, headerY + 1, headerWidth, headerHeight, borderRadius, borderRadius, 'F');

// header background color
doc.setFillColor(135, 206, 250); // light sky blue
doc.roundedRect(headerX, headerY, headerWidth, headerHeight, borderRadius, borderRadius, 'F');

// header text
doc.setFontSize(18);
doc.setFont('helvetica', 'bold');
doc.setTextColor(0, 0, 0);
doc.text('Health Care of Bangladesh', headerX + headerWidth / 2, headerY + 15, { align: 'center' });

doc.setFontSize(11);
doc.setFont('helvetica', 'normal');
doc.text('123/4, Azimpur, Dhaka, Bangladesh', headerX + headerWidth / 2, headerY + 25, { align: 'center' });
doc.text('Phone: +880 1234-567890 | Email: info@healthcare.com', headerX + headerWidth / 2, headerY + 33, { align: 'center' });




//  // ✅ Header Background (light sky blue only)
//   doc.setFillColor(135, 206, 250); // light sky blue
//   doc.rect(10, 10, 190, 35, 'F'); // header height 35mm


//   // ✅ Header Text
//   doc.setFontSize(18);
//   doc.setFont('helvetica', 'bold');
//   doc.setTextColor(0); // black
//   doc.text('Health Care of Bangladesh', 105, 25, { align: 'center' });

//   doc.setFontSize(11);
//   doc.setFont('helvetica', 'normal');
//   doc.text('123/4, Azimpur, Dhaka, Bangladesh', 105, 32, { align: 'center' });
//   doc.text('Phone: +880 1234-567890 | Email: info@healthcare.com', 105, 38, { align: 'center' });

//   doc.setLineWidth(0.5);
//   doc.line(10, 45, 200, 45);

//   doc.setFontSize(15);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Patient Discharge Bill', 105, 52, { align: 'center' });


  // ✅ Patient Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const patientY = 65;
  doc.text(`Patient Name : ${this.bill.patientName}`, 15, patientY);
  doc.text(`Age : ${this.bill.age}`, 15, patientY + 7);
  doc.text(`Phone : ${this.bill.phone}`, 15, patientY + 14);
  doc.text(`Address : ${this.bill.address}`, 15, patientY + 21);

  doc.text(`Admission Date : ${new Date(this.bill.admissionDate).toLocaleDateString()}`, 120, patientY);
  doc.text(`Discharge Date : ${new Date(this.bill.dischargeDate).toLocaleDateString()}`, 120, patientY + 7);

  // ✅ Bill Items Table
  autoTable(doc, {
    startY: patientY + 30,
    head: [['Category', 'Item', 'Amount (৳)']],
    body: this.bill.billItems.map(item => [
      item.category,
      item.itemName,
      item.amount.toFixed(2)
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 11 }
  });

 // ✅ Total Amount row (simple, working)
autoTable(doc, {
  startY: (doc as any).lastAutoTable.finalY + 5, // সামান্য gap
  body: [[
    { 
      content: 'Total Amount (৳)', 
      styles: { halign: 'right', fontStyle: 'bold', fontSize: 12 } 
    },
    { 
      content: this.bill.totalAmount.toFixed(2), 
      styles: { halign: 'right', fontStyle: 'bold', fontSize: 12 } 
    }
  ]],
  theme: 'plain',
  columnStyles: {
    0: { cellWidth: 120 },
    1: { cellWidth: 40 }
  }
});

  // ✅ Signature Section
  let finalY = (doc as any).lastAutoTable.finalY + 20;
  if (finalY > 250) {
    doc.addPage();
    finalY = 40;
  }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('_________________________', 20, finalY);
  doc.text('Authorized Signature', 25, finalY + 7);

  doc.text('_________________________', 140, finalY);
  doc.text('Patient / Guardian', 150, finalY + 7);

  // ✅ Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    'This is a computer-generated document. No signature required if printed digitally.',
    105, 285,
    { align: 'center' }
  );

  doc.save(`Discharge_Bill_${this.bill.patientName}.pdf`);
}









































// downloadPDF() {
//   if (!this.bill) return;

//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text('Discharge Bill', 14, 20);

//   doc.setFontSize(12);
//   doc.text(`Patient: ${this.bill.patientName}`, 14, 30);
//   doc.text(`Age: ${this.bill.age}`, 14, 37);
//   doc.text(`Phone: ${this.bill.phone}`, 14, 44);
//   doc.text(`Address: ${this.bill.address}`, 14, 51);
//   doc.text(`Admission: ${new Date(this.bill.admissionDate).toLocaleDateString()}`, 14, 58);
//   doc.text(`Discharge: ${new Date(this.bill.dischargeDate).toLocaleDateString()}`, 14, 65);

//   // ✅ use autoTable function directly
//   autoTable(doc, {
//     startY: 75,
//     head: [['Category', 'Item', 'Amount']],
//     body: this.bill.billItems.map(item => [item.category, item.itemName, item.amount.toFixed(2)]),
//   });

//   const finalY = (doc as any).lastAutoTable.finalY || 75;
//   doc.text(`Total Amount: ${this.bill.totalAmount.toFixed(2)}`, 14, finalY + 10);

//   doc.save(`Discharge_Bill_${this.bill.patientName}.pdf`);
// }



}
