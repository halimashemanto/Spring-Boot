import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor-service';

@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css'
})
export class AddDoctor {

 userForm: FormGroup;
  doctorForm: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(private fb: FormBuilder,
     private doctorService: DoctorService) {


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.doctorForm = this.fb.group({
      gender: ['', Validators.required],
      status: ['', Validators.required],
      study: ['', Validators.required],
      chamber: ['', Validators.required],
      department: ['', Validators.required],
      joinDate: ['', Validators.required]
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
      console.log('Selected file:', this.photoFile);
    }
  }

  onSubmit(): void {
    if (!this.photoFile) {
      this.message = 'Please upload a photo.';
      return;
    }
    if (this.userForm.invalid || this.doctorForm.invalid) {
      this.message = 'Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'Doctor' // adjust if necessary
    };

    const doctor = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.doctorForm.value.gender,
      status: this.doctorForm.value.status,
      joinDate: this.doctorForm.value.joinDate,
      study: this.doctorForm.value.study,
      chamber: this.doctorForm.value.chamber,
      department: this.doctorForm.value.department,
    };

    this.doctorService.registerDoctor(user, doctor, this.photoFile).subscribe({
      next: res => {
        this.message = res.Message || 'Registration successful!';
        this.userForm.reset();
        this.doctorForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Registration failed: ' + (err.error?.Message || err.message);
      }
    });
  }


}