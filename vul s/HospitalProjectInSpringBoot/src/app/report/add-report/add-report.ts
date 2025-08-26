import { ChangeDetectorRef, Component } from '@angular/core';
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
export class AddReport {



 
  doctors: Doctor[] = [];
  reports: Report[] = [];

    reportForm!: FormGroup;
  isEditing: boolean = false;
  selectedId?: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private reportService: ReportService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {
    this.reportForm = this.fb.group({
      reportResult: [''],
      description: [''],
      sampleId: [''],
      interpretation: [''],
      patientName: [''],
      testDate: [''],
      createDate: [''],
      deliveryDate: [''],
      doctor: [null
        
      ]
    });
  }
 ngOnInit(): void {
    this.loadDoctors();
    this.loadReports();
  }


  loadDoctors(): void {
    this.reportService.getAllDoctor().subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data || [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading doctors', err)
    });
  }

  loadReports(): void {
    this.reportService.getAllReport().subscribe({
      next: (data: any) => {
    
        let reportsArray: Report[] = [];
        if (Array.isArray(data)) {
          reportsArray = data;
        } else if (data && Array.isArray(data.content)) {
          reportsArray = data.content;
        }

       
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading reports', err)
    });
  }

  // onSubmit(): void {
  //   if (this.reportForm.invalid) {
     
  //     return;
  //   }

  //   const selectedDoctor: Doctor = this.reportForm.value.doctor;
  //   if (!selectedDoctor || !selectedDoctor.id) {
      
  //     return;
  //   }

  //   const report: Report = {
  //     ...this.reportForm.value,
  //     testDate: new Date(this.reportForm.value.testDate),
  //     createDate: this.reportForm.value.createDate ? new Date(this.reportForm.value.createDate) : new Date(),
  //     deliveryDate: this.reportForm.value.deliveryDate ? new Date(this.reportForm.value.deliveryDate) : undefined,
  //     doctor: selectedDoctor
  //   };

  //   this.reportService.createReport(report , selectedDoctor.id).subscribe({
  //     next: () => {
  //       alert('Report saved successfully!');
  //       this.resetForm();
  //       this.loadReports();
  //       this.cdr.markForCheck();
  //     },
  //     error: (err) => {
  //       console.error('Error saving report', err);
  //       alert('Failed to save report. ');
  //     }
  //   });
  // }

  
  resetForm(): void {
    this.reportForm.reset({ doctor: null });
  }
  }
