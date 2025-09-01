import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice-service';
import { Doctor } from '../../doctor/model/doctor.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Test } from '../../test/model/test.model';
import { DoctorService } from '../../doctor/doctor-service';
import { TestService } from '../../test/test-service';
import { Invoice } from '../model/invoice.model';




@Component({
  selector: 'app-add-invoice',
  standalone: false,
  templateUrl: './add-invoice.html',
  styleUrl: './add-invoice.css'
})
export class AddInvoice implements OnInit {



  doctors: Doctor[] = [];
  tests: Test[] = [];

  invoice = {
    patientName: '',
    patientContact: '',
    doctorId: 0,
    testDetails: [] as any[],
    discount: 0,
    received: 0,
    amount: 0,
    totalAmount: 0,
    due: 0,
    invoiceDate: new Date(),
    deliveryDate: new Date(),
    deliveryTime: 24
  };

  constructor(
    private doctorService: DoctorService,
    private testService: TestService,
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.doctorService.getAllDoctor().subscribe(d => this.doctors = d);
    this.testService.getAllTests().subscribe(t => this.tests = t);
  }

  addTest() {
    this.invoice.testDetails.push({ id: 0, testName: '', price: 0 });
  }

  removeTest(i: number) {
    this.invoice.testDetails.splice(i, 1);
    this.calculateTotal();
  }

  onTestChange(t: any) {
    const selectedTest = this.tests.find(test => test.id == t.id);
    if (selectedTest) {
      t.testName = selectedTest.testName;
      t.price = selectedTest.testPrice;
    } else {
      t.testName = 'N/A';
      t.price = 0;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    this.invoice.testDetails.forEach((t: any) => {
      total += Number(t.price) || 0;
    });

    this.invoice.amount = total;
    const discountAmount = (total * (this.invoice.discount || 0)) / 100;
    this.invoice.totalAmount = total - discountAmount;
    this.invoice.due = this.invoice.totalAmount - (this.invoice.received || 0);
  }

  saveInvoice() {
    if (!this.invoice.patientName || !this.invoice.doctorId) {
      alert('Patient Name & Doctor required');
      return;
    }
    if (!this.invoice.testDetails.length || this.invoice.testDetails.some(t => t.id === 0)) {
      alert('Select at least one test');
      return;
    }

    const payload = {
      patientName: this.invoice.patientName,
      patientContact: this.invoice.patientContact,
      doctorId: this.invoice.doctorId,
      testIds: this.invoice.testDetails.map(t => t.id),
      discount: this.invoice.discount,
      received: this.invoice.received,
      amount: this.invoice.amount,
      totalAmount: this.invoice.totalAmount,
      invoiceDate: this.invoice.invoiceDate,
      deliveryDate: this.invoice.deliveryDate,
      deliveryTime: this.invoice.deliveryTime
    };

    this.invoiceService.saveInvoice(payload).subscribe({
      next: (savedInvoice: any) => {
        // PDF এর জন্য name + price map করা
        savedInvoice.testDetails = this.invoice.testDetails.map(t => ({
          testName: t.testName || 'N/A',
          price: t.price || 0
        }));
        savedInvoice.doctorName = this.doctors.find(d => d.id === savedInvoice.doctorId)?.name || '';

        alert('Invoice saved successfully!');
        this.generatePDF(savedInvoice);
        this.resetForm();
      },
      error: err => {
        console.error('Error saving invoice:', err);
        alert('Failed to save invoice.');
      }
    });
  }

  resetForm() {
    this.invoice = {
      patientName: '',
      patientContact: '',
      doctorId: 0,
      testDetails: [],
      discount: 0,
      received: 0,
      amount: 0,
      totalAmount: 0,
      due: 0,
      invoiceDate: new Date(),
      deliveryDate: new Date(),
      deliveryTime: 24
    };
  }
generatePDF(inv: any) {
  const doc = new jsPDF({ format: 'a5' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // BORDER (sky blue)
  doc.setDrawColor(135, 206, 235); // sky blue
  doc.setLineWidth(1.5);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

  // HEADER BOX (sky blue)
  doc.setFillColor(135, 206, 235);
  doc.rect(5, 5, pageWidth - 10, 35, 'F');

  // HEADER TEXT (centered)
  doc.setTextColor(0);
  doc.setFontSize(16);
  doc.text('Health Care of Bangladesh', pageWidth / 2, 18, { align: 'center' });
  doc.setFontSize(9);
  doc.text('“Trust, Hope & Healing — Your Health Our Priority”', pageWidth / 2, 25, { align: 'center' });
  doc.text('Address: 123, Azimpur, Lalbagh-Road, Dhaka-1205, Bangladesh', pageWidth / 2, 32, { align: 'center' });

  // PATIENT INFO
  doc.setTextColor(0);
  doc.setFontSize(10);
  let startY = 45;
  doc.text(`Patient: ${inv.patientName}`, 10, startY);
  doc.text(`Contact: ${inv.patientContact || ''}`, 10, startY + 6);
  doc.text(`Doctor: ${inv.doctorName || ''}`, 10, startY + 12);
  doc.text(`Invoice Date: ${new Date(inv.invoiceDate).toLocaleString()}`, 10, startY + 18);
  doc.text(`Delivery Date: ${new Date(inv.deliveryDate).toLocaleDateString()}`, 10, startY + 24);
  doc.text(`Delivery Time: ${inv.deliveryTime} hrs`, 10, startY + 30);

  // TESTS TABLE
  const testData = inv.testDetails.map((t: any, i: number) => [
    i + 1,
    t.testName,
    t.price.toFixed(2)
  ]);

  autoTable(doc, {
    startY: startY + 40,
    head: [['#', 'Test Name', 'Price (BDT)']],
    body: testData,
    theme: 'grid',
    headStyles: { fillColor: [135, 206, 235], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [230, 245, 255] },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'left' },
      2: { halign: 'right', cellWidth: 35 }
    },
    styles: { fontSize: 10, cellPadding: 2 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 5;

  // TOTALS (right aligned)
  doc.setFontSize(10);
  doc.text(`Amount: ${inv.amount.toFixed(2)} BDT`, pageWidth - 15, finalY, { align: 'right' });
  doc.text(`Discount: ${inv.discount} %`, pageWidth - 15, finalY + 5, { align: 'right' });
  doc.text(`Total Amount: ${inv.totalAmount.toFixed(2)} BDT`, pageWidth - 15, finalY + 10, { align: 'right' });
  doc.text(`Received: ${inv.received.toFixed(2)} BDT`, pageWidth - 15, finalY + 15, { align: 'right' });
  doc.text(`Due: ${inv.due.toFixed(2)} BDT`, pageWidth - 15, finalY + 20, { align: 'right' });

  // FOOTER
  doc.setFontSize(10);
  doc.text('Prepared By: ______________________', 10, finalY + 40);
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text('Thank you for trusting Health Care of Bangladesh.', pageWidth / 2, pageHeight - 15, { align: 'center' });

  // PAGE NUMBER
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`Page 1 of 1`, pageWidth - 10, pageHeight - 10, { align: 'right' });

  // SAVE PDF
  doc.save(`Invoice_${inv.patientName}_${new Date().getTime()}.pdf`);
}



//   generatePDF(inv: any) {
//   // A5 page size
//   const doc = new jsPDF({ format: 'a5' });
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   // DRAW BORDER
//   doc.setDrawColor(40, 116, 240);
//   doc.setLineWidth(1.5);
//   doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // 5pt margin all around

//   // HEADER BOX
//   doc.setFillColor(40, 116, 240);
//   doc.rect(5, 5, pageWidth - 10, 30, 'F'); // header background

//   // HEADER TEXT
//   doc.setTextColor(255);
//   doc.setFontSize(16);
//   doc.text('Health Care of Bangladesh', pageWidth / 2, 20, { align: 'center' });

//   doc.setFontSize(9);
//   doc.text('“Trust, Hope & Healing — Your Health Our Priority”', pageWidth / 2, 27, { align: 'center' });
//   doc.text('Address: 123, Azimpur, Lalbagh-Road, Dhaka-1205, Bangladesh', pageWidth / 2, 32, { align: 'center' });

//   // PATIENT INFO
//   doc.setTextColor(0);
//   doc.setFontSize(10);
//   let startY = 45;
//   doc.text(`Patient: ${inv.patientName}`, 10, startY);
//   doc.text(`Contact: ${inv.patientContact || ''}`, 10, startY + 6);
//   doc.text(`Doctor: ${inv.doctorName || ''}`, 10, startY + 12);
//   doc.text(`Invoice Date: ${new Date(inv.invoiceDate).toLocaleString()}`, 10, startY + 18);
//   doc.text(`Delivery Date: ${new Date(inv.deliveryDate).toLocaleDateString()}`, 10, startY + 24);
//   doc.text(`Delivery Time: ${inv.deliveryTime} hrs`, 10, startY + 30);

//   // TESTS TABLE
//   const testData = inv.testDetails.map((t: any, i: number) => [
//     i + 1,
//     t.testName,
//     t.price.toFixed(2)
//   ]);

//   autoTable(doc, {
//     startY: startY + 40,
//     head: [['#', 'Test Name', 'Price (BDT)']],
//     body: testData,
//     theme: 'grid',
//     headStyles: { fillColor: [40, 116, 240], textColor: 255, fontStyle: 'bold' },
//     alternateRowStyles: { fillColor: [240, 248, 255] },
//     columnStyles: {
//       0: { halign: 'center', cellWidth: 15 },
//       1: { halign: 'left' },
//       2: { halign: 'right', cellWidth: 35 }
//     },
//     styles: { fontSize: 10, cellPadding: 2 },
//   });

//   const finalY = (doc as any).lastAutoTable.finalY + 5;

//   // TOTALS (right aligned)
//   doc.setFontSize(10);
//   doc.text(`Amount: ${inv.amount.toFixed(2)} BDT`, pageWidth - 15, finalY, { align: 'right' });
//   doc.text(`Discount: ${inv.discount} %`, pageWidth - 15, finalY + 5, { align: 'right' });
//   doc.text(`Total Amount: ${inv.totalAmount.toFixed(2)} BDT`, pageWidth - 15, finalY + 10, { align: 'right' });
//   doc.text(`Received: ${inv.received.toFixed(2)} BDT`, pageWidth - 15, finalY + 15, { align: 'right' });
//   doc.text(`Due: ${inv.due.toFixed(2)} BDT`, pageWidth - 15, finalY + 20, { align: 'right' });

//   // FOOTER
//   doc.setFontSize(10);
//   doc.text('Prepared By: ______________________', 10, finalY + 40);
//   doc.setFontSize(8);
//   doc.setTextColor(120);
//   doc.text('Thank you for trusting Health Care of Bangladesh.', pageWidth / 2, pageHeight - 10, { align: 'center' });

//   // SAVE PDF
//   doc.save(`Invoice_${inv.patientName}_${new Date().getTime()}.pdf`);
// }

// generatePDF(inv: any) {
//   const doc = new jsPDF({ format: 'a5' });
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   // BORDER
//   doc.setDrawColor(40, 116, 240);
//   doc.setLineWidth(1.5);
//   doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

//   // HEADER BOX
//   doc.setFillColor(40, 116, 240);
//   doc.rect(5, 5, pageWidth - 10, 35, 'F');

//   // LOGO (circle)
//   doc.setFillColor(255, 255, 255);
//   doc.circle(15, 22, 7, 'F'); // small white circle logo
//   doc.setTextColor(40, 116, 240);
//   doc.setFontSize(10);
//   doc.text('H', 15, 25, { align: 'center' });

//   // HEADER TEXT
//   doc.setTextColor(255);
//   doc.setFontSize(16);
//   doc.text('Health Care of Bangladesh', pageWidth / 2, 18, { align: 'center' });
//   doc.setFontSize(9);
//   doc.text('“Trust, Hope & Healing — Your Health Our Priority”', pageWidth / 2, 25, { align: 'center' });
//   doc.text('Address: 123, Azimpur, Lalbagh-Road, Dhaka-1205, Bangladesh', pageWidth / 2, 32, { align: 'center' });

//   // PATIENT INFO
//   doc.setTextColor(0);
//   doc.setFontSize(10);
//   let startY = 45;
//   doc.text(`Patient: ${inv.patientName}`, 10, startY);
//   doc.text(`Contact: ${inv.patientContact || ''}`, 10, startY + 6);
//   doc.text(`Doctor: ${inv.doctorName || ''}`, 10, startY + 12);
//   doc.text(`Invoice Date: ${new Date(inv.invoiceDate).toLocaleString()}`, 10, startY + 18);
//   doc.text(`Delivery Date: ${new Date(inv.deliveryDate).toLocaleDateString()}`, 10, startY + 24);
//   doc.text(`Delivery Time: ${inv.deliveryTime} hrs`, 10, startY + 30);

//   // TESTS TABLE
//   const testData = inv.testDetails.map((t: any, i: number) => [
//     i + 1,
//     t.testName,
//     t.price.toFixed(2)
//   ]);

//   autoTable(doc, {
//     startY: startY + 40,
//     head: [['#', 'Test Name', 'Price (BDT)']],
//     body: testData,
//     theme: 'grid',
//     headStyles: { fillColor: [40, 116, 240], textColor: 255, fontStyle: 'bold' },
//     alternateRowStyles: { fillColor: [240, 248, 255] },
//     columnStyles: {
//       0: { halign: 'center', cellWidth: 15 },
//       1: { halign: 'left' },
//       2: { halign: 'right', cellWidth: 35 }
//     },
//     styles: { fontSize: 10, cellPadding: 2 },
//   });

//   const finalY = (doc as any).lastAutoTable.finalY + 5;

//   // TOTALS
//   doc.setFontSize(10);
//   doc.text(`Amount: ${inv.amount.toFixed(2)} BDT`, pageWidth - 15, finalY, { align: 'right' });
//   doc.text(`Discount: ${inv.discount} %`, pageWidth - 15, finalY + 5, { align: 'right' });
//   doc.text(`Total Amount: ${inv.totalAmount.toFixed(2)} BDT`, pageWidth - 15, finalY + 10, { align: 'right' });
//   doc.text(`Received: ${inv.received.toFixed(2)} BDT`, pageWidth - 15, finalY + 15, { align: 'right' });
//   doc.text(`Due: ${inv.due.toFixed(2)} BDT`, pageWidth - 15, finalY + 20, { align: 'right' });

//   // FOOTER
//   doc.setFontSize(10);
//   doc.text('Prepared By: ______________________', 10, finalY + 40);
//   doc.setFontSize(8);
//   doc.setTextColor(120);
//   doc.text('Thank you for trusting Health Care of Bangladesh.', pageWidth / 2, pageHeight - 15, { align: 'center' });

//   // PAGE NUMBER
//   doc.setFontSize(8);
//   doc.setTextColor(150);
//   doc.text(`Page 1 of 1`, pageWidth - 10, pageHeight - 10, { align: 'right' });

//   // SAVE PDF
//   doc.save(`Invoice_${inv.patientName}_${new Date().getTime()}.pdf`);
// }

}