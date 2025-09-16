import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorChargeService } from '../doctor-charge-service';
import { DoctorCharge,PatientDoctorCharge } from '../model/doctorCharge.model';
import { DoctorService } from '../../doctor/doctor-service';
import { Doctor } from '../../doctor/model/doctor.model';

@Component({
  selector: 'app-add-doctor-charge',
  standalone: false,
  templateUrl: './add-doctor-charge.html',
  styleUrl: './add-doctor-charge.css'
})
export class AddDoctorCharge implements OnInit {

 form: FormGroup;
  bedBookingId?: number;
  doctors: Doctor[] = [];
  patientCharges?: PatientDoctorCharge;
  loading = false;
  errorMessage = '';

constructor(
  private fb: FormBuilder,
  private service: DoctorChargeService,
  private doctorService: DoctorService, // inject here
  private cdr: ChangeDetectorRef
) {
  this.form = this.fb.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    doctorId: ['', Validators.required],
    visitDate: ['', Validators.required]
  });
}

ngOnInit(): void {
  this.loadDoctors();
}

loadDoctors() {
  this.doctorService.getAllDoctor().subscribe({
    next: data => {
      this.doctors = data;
      this.cdr.markForCheck();
    },
    error: _ => this.errorMessage = 'Could not load doctors'
  });
}


loadPatientCharges() {
  if (!this.bedBookingId) return;
  this.loading = true;
  this.service.getPatientCharges(this.bedBookingId).subscribe({
    next: data => {
      // ✅ ekhane doctorName assign korchi
      data.charges = data.charges.map(c => ({
        ...c,
        doctorName: this.doctors.find(d => d.id === c.doctorId)?.name || ''
      }));
      this.patientCharges = data;
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: _ => {
      this.errorMessage = 'Patient charges could not be loaded';
      this.loading = false;
    }
  });
}



  addCharge() {
    if (!this.bedBookingId || this.form.invalid) return;

    const charge: DoctorCharge = {
      ...this.form.value,
      bedBookingId: this.bedBookingId
    };

    this.service.addCharge(charge).subscribe({
      next: _ => {
        this.form.reset();
        this.loadPatientCharges();
      },
      error: _ => this.errorMessage = 'Could not add charge'
    });
  }

  deleteCharge(chargeId: number) {
    this.service.deleteCharge(chargeId).subscribe({
      next: _ => this.loadPatientCharges(),
      error: _ => this.errorMessage = 'Could not delete charge'
    });
  }

}
