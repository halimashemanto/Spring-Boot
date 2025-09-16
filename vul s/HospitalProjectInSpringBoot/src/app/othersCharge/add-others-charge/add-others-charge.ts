import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OthersCharge, PatientOthersCharge } from '../model/othersCharge.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OthersChargeService } from '../others-charge-service';

@Component({
  selector: 'app-add-others-charge',
  standalone: false,
  templateUrl: './add-others-charge.html',
  styleUrl: './add-others-charge.css'
})
export class AddOthersCharge implements OnInit {

  form: FormGroup;
  patientCharges?: PatientOthersCharge;
  bedBookingId?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private service: OthersChargeService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void { }

  loadPatientCharges() {
    if (!this.bedBookingId) return;

    this.loading = true;
    this.service.getPatientCharges(this.bedBookingId).subscribe({
      next: data => {
        this.patientCharges = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: err => {
        this.errorMessage = 'Patient charges could not be loaded';
        this.loading = false;
      }
    });
  }

  addCharge() {
    if (!this.bedBookingId) return;
    if (this.form.invalid) return;

    const charge: OthersCharge = {
      ...this.form.value,
      bedBookingId: this.bedBookingId
    };

    this.service.addCharge(charge).subscribe({
      next: _ => {
        this.form.reset();
        this.loadPatientCharges();
      },
      error: err => {
        this.errorMessage = 'Could not add charge';
      }
    });
  }

  deleteCharge(chargeId: number) {
    this.service.deleteCharge(chargeId).subscribe({
      next: _ => this.loadPatientCharges(),
      error: _ => this.errorMessage = 'Could not delete charge'
    });
  }

}
