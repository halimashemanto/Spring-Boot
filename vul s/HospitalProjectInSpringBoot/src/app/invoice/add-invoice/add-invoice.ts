import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice-service';
import { InvoiceDTO } from '../model/invoice.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AppoinmentService } from '../../Appoinment/appoinment-service';


@Component({
  selector: 'app-add-invoice',
  standalone: false,
  templateUrl: './add-invoice.html',
  styleUrl: './add-invoice.css'
})
export class AddInvoice {


  invoiceForm: FormGroup;
  doctors: any[] = [];
  tests: any[] = [];
  invoices: InvoiceDTO[] = [];

  constructor(private fb: FormBuilder,
     private invoiceService: InvoiceService,
    private appointmentService: AppoinmentService
  ) {
    this.invoiceForm = this.fb.group({
      doctorId: [null, Validators.required],
      doctorName: [''],
      appoinmentId: [null],
      patientName: [''],
      patientContact: [''],
      testIds: [[]],
      testNames: [[]],
      discount: [0],
      invoiceDate: [new Date()],
      deliveryDate: [new Date()],
      deliveryTime: [0],
      preparedBy: ['']
    });
  }

ngOnInit() {
  this.invoiceForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
    if (doctorId != null) {
      const selectedDoctor = this.doctors.find(d => d.id === doctorId);
      if (selectedDoctor) {
        this.invoiceForm.patchValue({ doctorName: selectedDoctor.name });

        // Appointment fetch
        this.appointmentService.getAppointmentByDoctorId(doctorId).subscribe(app => {
          if (app) {
            this.invoiceForm.patchValue({
              patientName: app.patientName,
              patientContact: app.patientContact,
              appoinmentId: app.id
            });
          }
        });
      }
    }
  });
}


  loadDoctors() {
    this.invoiceService.getAllDoctors().subscribe(data => this.doctors = data);
  }

  loadTests() {
    this.invoiceService.getAllTests().subscribe(data => this.tests = data);
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe(data => this.invoices = data);
  }

  onDoctorChange(doctorId: number) { // string to number
    
  const selectedDoctor = this.doctors.find(d => d.id === doctorId);
  if (selectedDoctor) {
    this.invoiceForm.patchValue({ doctorName: selectedDoctor.name });
      this.invoiceService.getAppointmentByDoctorId(doctorId).subscribe(app => {
        if (app) {
          this.invoiceForm.patchValue({
            patientName: app.patientName,
            patientContact: app.patientContact,
            appoinmentId: app.id
          });
        }
      });
    }
  }

  createInvoice() {
    if (this.invoiceForm.invalid) return;

    const formValue = this.invoiceForm.value;

    const selectedTestNames = this.tests
      .filter(t => formValue.testIds.includes(t.id))
      .map(t => t.name);

    const dto: InvoiceDTO = {
      ...formValue,
      testNames: selectedTestNames,
      totalAmount: selectedTestNames.length * 100,
      totalDiscount: formValue.discount,
      payable: selectedTestNames.length * 100 - (formValue.discount || 0),
      received: 0,
      due: selectedTestNames.length * 100 - (formValue.discount || 0)
    };

    this.invoiceService.createInvoice(dto).subscribe(res => {
      alert('Invoice saved!');
      this.generatePDF(res);
      this.invoiceForm.reset({ discount: 0, testIds: [], testNames: [] });
      this.loadInvoices();
    });
  }

  generatePDF(invoice: InvoiceDTO) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice.id}`, 14, 32);
    doc.text(`Doctor: ${invoice.doctorName}`, 14, 40);
    doc.text(`Patient: ${invoice.patientName}`, 14, 48);
    doc.text(`Invoice Date: ${invoice.invoiceDate?.toString()}`, 14, 56);

    const rows = invoice.testNames?.map((name, i) => [i + 1, name, '100']) || [];
    (doc as any).autoTable({ head: [['#', 'Test Name', 'Price']], body: rows, startY: 65 });

    const finalY = (rows.length + 8) * 10 + 60;
    doc.text(`Total: ${invoice.totalAmount}`, 14, finalY);
    doc.text(`Discount: ${invoice.totalDiscount}`, 14, finalY + 10);
    doc.text(`Payable: ${invoice.payable}`, 14, finalY + 20);

    doc.save(`Invoice_${invoice.id}.pdf`);
  }



}