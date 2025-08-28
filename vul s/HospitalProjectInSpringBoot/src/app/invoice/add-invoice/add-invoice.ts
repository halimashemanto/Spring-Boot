import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice-service';
import { Doctor } from '../../doctor/model/doctor.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Test } from '../../test/model/test.model';
import { DoctorService } from '../../doctor/doctor-service';
import { TestService } from '../../test/test-service';




interface TestInvoice {
  testId: number;
  testName?: string;
  price?: number;
}



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
    appoinmentId: 0,
    testDetails: [] as TestInvoice[],
    discount: 0,
    received: 0,
    invoiceDate: new Date(),
    deliveryDate: new Date(),
    deliveryTime: 24
  };

  constructor(
    private doctorService: DoctorService,
    private testService: TestService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.doctorService.getAllDoctor().subscribe(d => this.doctors = d);
    this.testService.getAllTests().subscribe(t => this.tests = t);
  }

  addTest() {
    this.invoice.testDetails.push({ testId: 0 });
  }

  removeTest(i: number) {
    this.invoice.testDetails.splice(i, 1);
  }

  onTestChange(testInv: TestInvoice) {
    const test = this.tests.find(t => t.id === testInv.testId);
    if (test) {
      testInv.testName = test.testName;
      testInv.price = test.testPrice;
    }
  }

  saveInvoice() {
    // Validate
    if (!this.invoice.patientName || !this.invoice.doctorId) {
      alert('Patient Name & Doctor required');
      return;
    }
    if (!this.invoice.testDetails.length || this.invoice.testDetails.some(t => t.testId === 0)) {
      alert('Select at least one test');
      return;
    }

    // Payload
    const payload = {
      patientName: this.invoice.patientName,
      patientContact: this.invoice.patientContact,
      doctorId: this.invoice.doctorId,
      appoinmentId: this.invoice.appoinmentId || null,
      testIds: this.invoice.testDetails.map(t => t.testId),
      discount: this.invoice.discount,
      received: this.invoice.received,
      invoiceDate: this.invoice.invoiceDate,
      deliveryDate: this.invoice.deliveryDate,
      deliveryTime: this.invoice.deliveryTime
    };

    console.log('Payload going to backend:', payload);

    this.invoiceService.saveInvoice(payload).subscribe({
      next: (savedInvoice: any) => {
        console.log('Saved invoice response:', savedInvoice);
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
      appoinmentId: 0,
      testDetails: [],
      discount: 0,
      received: 0,
      invoiceDate: new Date(),
      deliveryDate: new Date(),
      deliveryTime: 24
    };
  }

  generatePDF(inv: any) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Health Care of Bangladesh', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${inv.id}`, 14, 30);
    doc.text(`Patient: ${inv.patientName}`, 14, 37);
    doc.text(`Contact: ${inv.patientContact}`, 14, 44);
    doc.text(`Doctor: ${inv.doctorName}`, 14, 51);
    doc.text(`Appointment ID: ${inv.appoinmentId}`, 14, 58);
    doc.text(`Invoice Date: ${new Date(inv.invoiceDate).toLocaleString()}`, 14, 65);
    doc.text(`Delivery Date: ${new Date(inv.deliveryDate).toLocaleString()}`, 14, 72);
    doc.text(`Delivery Time: ${inv.deliveryTime} hrs`, 14, 79);

    const table = autoTable(doc, {
      startY: 90,
      head: [['Test Name', 'Price (BDT)']],
      body: inv.testNames.map((name: string, i: number) => [name, inv.testPrices ? inv.testPrices[i] : ''])
    });

    let finalY = 90; // table শুরু হবার Y

autoTable(doc, {
  startY: finalY,
  head: [['Test Name', 'Price (BDT)']],
  body: inv.testNames.map((name: string, i: number) => [name, inv.testPrices ? inv.testPrices[i] : '']),
  didDrawCell: (data) => {
    // শেষ row আসলে cursor update
    if (data.row.index === inv.testNames.length - 1) {
      finalY = data.cell.y + data.cell.height;
    }
  }
});

// এখন finalY দিয়ে totals লিখতে পারো
doc.text(`Amount: ${inv.amount} BDT`, 150, finalY + 10);
doc.text(`Discount: ${inv.discount} %`, 150, finalY + 17);
doc.text(`Total Amount: ${inv.totalAmount} BDT`, 150, finalY + 24);
doc.text(`Received: ${inv.received || 0} BDT`, 150, finalY + 31);
doc.text(`Due: ${inv.due} BDT`, 150, finalY + 38);

}
}