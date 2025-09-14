import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorChargeService } from '../doctor-charge-service';
import { DoctorDTO } from '../../Appoinment/model/doctorDTO';
import { DoctorChargeDTO } from '../model/doctorCharge.model';

@Component({
  selector: 'app-add-doctor-charge',
  standalone: false,
  templateUrl: './add-doctor-charge.html',
  styleUrl: './add-doctor-charge.css'
})
export class AddDoctorCharge {


 charges: DoctorChargeDTO[] = [];
  form: FormGroup;
  bedBookingId: number = 0; // example, dynamic o kora jabe

  constructor(
    private service: DoctorChargeService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      doctorId: [0, Validators.required],
      bedBookingId: [this.bedBookingId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCharges();
  }

  loadCharges() {
    this.service.getChargesByBed(this.bedBookingId).subscribe(data => {
      this.charges = data;
    });
  }

  saveCharge() {
    if (this.form.invalid) return;
    this.service.saveCharge(this.form.value).subscribe(saved => {
      alert('Charge saved!');
      this.form.reset({ bedBookingId: this.bedBookingId });
      this.loadCharges();
    });
  }

}
