import { Component } from '@angular/core';
import { DischargeBillDTO } from '../model/dischargeBill.model';
import { DischargeBillService } from '../discharge-bill-service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    doc.setFontSize(16);
    doc.text('Discharge Bill', 14, 20);

    doc.setFontSize(12);
    doc.text(`Patient: ${this.bill.patientName}`, 14, 30);
    doc.text(`Age: ${this.bill.age}`, 14, 37);
    doc.text(`Phone: ${this.bill.phone}`, 14, 44);
    doc.text(`Address: ${this.bill.address}`, 14, 51);
    doc.text(`Admission: ${new Date(this.bill.admissionDate).toLocaleDateString()}`, 14, 58);
    doc.text(`Discharge: ${new Date(this.bill.dischargeDate).toLocaleDateString()}`, 14, 65);

    // Table of bill items
    (doc as any).autoTable({
      startY: 75,
      head: [['Category', 'Item', 'Amount']],
      body: this.bill.billItems.map(item => [item.category, item.itemName, item.amount.toFixed(2)]),
    });

    doc.text(`Total Amount: ${this.bill.totalAmount.toFixed(2)}`, 14, (doc as any).lastAutoTable.finalY + 10);

    doc.save(`Discharge_Bill_${this.bill.patientName}.pdf`);
  }


}
