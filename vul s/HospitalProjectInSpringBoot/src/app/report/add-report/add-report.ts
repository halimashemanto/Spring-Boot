import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from '../../doctor/model/doctor.model';
import { ReportService } from '../report-service';
import { DoctorService } from '../../doctor/doctor-service';

@Component({
  selector: 'app-add-report',
  standalone: false,
  templateUrl: './add-report.html',
  styleUrl: './add-report.css'
})
export class AddReport {


  reportForm: FormGroup;
  doctors: Doctor[] = [];
  report: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private doctorService: DoctorService,
    private cdr : ChangeDetectorRef
  ) {
    this.reportForm = this.fb.group({
      doctor: [null],
      date: [''],
      startTime: [''],
      endTime: [''],
      isBooked: [false]
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadReport();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctor().subscribe({
      
      next: (data) => this.doctors = data,
      error: (err) => console.error('Error loading doctors', err)
      
    });
    this.cdr.markForCheck();
  }

 
loadReport(): void {
  this.reportService.getAllReport().subscribe({
    next: (data) => {
      this.report = data.map(slot => ({
        ...this.report,
        doctor: slot.doctor || { doctorName: 'Unknown' } 
      }));
    },
    error: err => console.error(err)
  });
  this.cdr.markForCheck();
}





// onSubmit(): void {
//   if (this.reportForm.invalid) return;

//   const selectedDoctor: Doctor = this.reportForm.value.doctor;

//   const newReport: Report = {
//     id: this.reportForm.value.id, 
//     date: this.reportForm.value.date,
//     startTime: this.reportForm.value.startTime,
//     endTime: this.reportForm.value.endTime,
//     booked: this.reportForm.value.isBooked || false,
//     doctor: selectedDoctor   
//   };

//   this.reportService.createReport(newReport, selectedDoctor.id!).subscribe({
//     next: () => {
//       alert('Report saved!');
//       this.reportForm.reset({ doctor:null });
//       this.loadReport();
//     },
//     error: err => console.error(err)
//   });
//   this.cdr.markForCheck();
// }


}
