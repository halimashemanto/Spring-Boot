import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from '../../doctor/model/doctor.model';
import { ReportService } from '../report-service';
import { DoctorService } from '../../doctor/doctor-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-report',
  standalone: false,
  templateUrl: './add-report.html',
  styleUrl: './add-report.css'
})
export class AddReport implements OnInit {

  reports: any[] = [];
  reportForm: FormGroup;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.reportForm = this.fb.group({
      reportResult: [''],
      description: [''],
      sampleId: [''],
      interpretation: [''],
      patientName: [''],
      testDate: [''],
      createDate: [''],
      deliveryDate: [''],
      doctorId: [null]
    });
  }

  ngOnInit(): void {
    this.loadReports();
  }

 loadReports() {
  this.reportService.getAllReports().subscribe({
    next: (data) => {
      console.log('Reports from backend:', data);  // ✅ check backend response
      this.reports = data;
    },
    error: (err) => console.error('Error loading reports:', err)
  });
}

  saveReport() {
    const doctorId = this.reportForm.value.doctorId;
    this.reportService.saveReport(this.reportForm.value, doctorId).subscribe(() => {
      this.reportForm.reset();
      this.loadReports();
    });
  }

  deleteReport(id: number) {
    if(confirm('Are you sure?')) {
      this.reportService.deleteReport(id).subscribe(() => this.loadReports());
    }
  }
}