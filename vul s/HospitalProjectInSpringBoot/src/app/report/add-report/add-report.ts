import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../doctor/model/doctor.model';
import { ReportService } from '../report-service';
import { DoctorService } from '../../doctor/doctor-service';
import jsPDF from 'jspdf';
import { ReportDTO } from '../model/report.model';

@Component({
  selector: 'app-add-report',
  standalone: false,
  templateUrl: './add-report.html',
  styleUrl: './add-report.css'
})
export class AddReport implements OnInit {
reportForm!: FormGroup;
  doctors: Doctor[] = [];
  saving = false;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      patientName: ['', Validators.required],
      patientContact: ['', Validators.required],
      gender: ['', Validators.required],
      preparedBy: ['', Validators.required],
      doctorId: [null, Validators.required],
      testDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      reportResult: ['', Validators.required],
      description: ['']
    });

    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctor().subscribe({
      next: (res) => this.doctors = res,
      error: (err) => {
        console.error('Error loading doctors', err);
        this.doctors = [];
      }
    });
  }

  saveReport() {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
    
      return;
    }

    const payload: ReportDTO = {
      ...this.reportForm.value,
   
      createDate: new Date().toISOString()
    };

    this.saving = true;
    this.reportService.saveReport(payload).subscribe({
      next: (res) => {
        this.saving = false;
        alert('Report saved successfully!');
        this.generatePDF(res);
        this.reportForm.reset();
      },
      error: (err) => {
        this.saving = false;
        console.error('Save report error', err);
        
      }
    });
  }
generatePDF(report: ReportDTO) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- Page Border (4 sides) ---
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // --- Header (sky blue) ---
  doc.setFillColor(135, 206, 250); // sky blue
  doc.rect(10, 10, pageWidth - 20, 80, 'F');

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Health Care of Bangladesh', pageWidth / 2, 45, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'italic');
  doc.text('Patient Test Report', pageWidth / 2, 65, { align: 'center' });

  // Address
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('123, Health Street, Dhaka, Bangladesh | Phone: +880123456789', pageWidth / 2, 80, { align: 'center' });

  // --- Patient Info Card ---
  doc.setDrawColor(0);
  doc.setFillColor(245, 245, 255); // soft background
  doc.roundedRect(40, 110, pageWidth - 80, 130, 8, 8, 'F');

  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  const left = 60;
  let y = 140;

  // Patient & Report Info
  doc.setFont('helvetica', 'bold');
  doc.text('Patient Name:', left, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${report.patientName}`, left + 100, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Contact:', left + 300, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${report.patientContact}`, left + 360, y);

  y += 25;
  doc.setFont('helvetica', 'bold');
  doc.text('Gender:', left, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${report.gender}`, left + 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Prepared By:', left + 300, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${report.preparedBy}`, left + 390, y);

  y += 25;
  const docName = report.doctorName || (this.doctors.find(d => d.id === report.doctorId)?.name ?? 'Unknown');
  doc.setFont('helvetica', 'bold');
  doc.text('Doctor:', left, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${docName}`, left + 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Sample ID:', left + 300, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${report.id ?? '—'}`, left + 360, y);

  // Divider line
  y += 35;
  doc.setDrawColor(150);
  doc.setLineWidth(0.8);
  doc.line(left, y, pageWidth - 60, y);

  // --- Test Result Box (plain) ---
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Test Result:', left, y);
  y += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(report.reportResult || '-', left + 10, y, { maxWidth: pageWidth - 120 });

  y += 25;
  doc.setFont('helvetica', 'italic');
  doc.text('Description:', left, y);
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.text(report.description || '-', left + 10, y, { maxWidth: pageWidth - 120 });

  // --- Footer ---
  const footerY = pageHeight - 40;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Delivery Date: ${this.formatDate(report.deliveryDate)}`, left, footerY);
  doc.text(`Generated: ${this.formatDate(new Date().toISOString())}`, pageWidth - 180, footerY);

  // --- Save PDF ---
  doc.save(`Report_${report.id ?? Date.now()}.pdf`);
}

private formatDate(d?: string) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString();
}

}