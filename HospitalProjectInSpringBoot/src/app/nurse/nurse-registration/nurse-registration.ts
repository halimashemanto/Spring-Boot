import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NurseService } from '../nurse-service';

@Component({
  selector: 'app-nurse-registration',
  standalone: false,
  templateUrl: './nurse-registration.html',
  styleUrl: './nurse-registration.css'
})
export class NurseRegistration {

  userForm: FormGroup;
  nurseForm: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(private fb: FormBuilder,
    private nurseService: NurseService) {


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.nurseForm = this.fb.group({
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
    if (this.userForm.invalid || this.nurseForm.invalid) {
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
      gender: this.nurseForm.value.gender,

      address: this.nurseForm.value.address,
      shift: this.nurseForm.value.shift,
      workingHours: this.nurseForm.value.workingHours,
      nurseType: this.nurseForm.value.nurseType,
      
      joinDate: this.nurseForm.value.joinDate,
    };

    this.nurseService.registerNurse(user, doctor, this.photoFile).subscribe({
      next: res => {
        this.message = res.Message || 'Registration successful!';
        this.userForm.reset();
        this.nurseForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Registration failed: ' + (err.error?.Message || err.message);
      }
    });
  }


}