import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeStaffService } from '../office-staff-service';

@Component({
  selector: 'app-office-staff-registration',
  standalone: false,
  templateUrl: './office-staff-registration.html',
  styleUrl: './office-staff-registration.css'
})
export class OfficeStaffRegistration {


  userForm: FormGroup;
  officeStaffForm: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(private fb: FormBuilder,
    private officeStaffService: OfficeStaffService) {


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.officeStaffForm = this.fb.group({
      gender: [''],
      position: [''],
      age: [''],
      workingHours: [''],
      department: [''],
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
    if (this.userForm.invalid || this.officeStaffForm.invalid) {
      this.message = 'Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'OfficeStaff' // adjust if necessary
    };

    const officeStaff = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.officeStaffForm.value.gender,
      position: this.officeStaffForm.value.position,
      joinDate: this.officeStaffForm.value.joinDate,
      age: this.officeStaffForm.value.age,
      workingHours: this.officeStaffForm.value.workingHours,
      department: this.officeStaffForm.value.department,
    };

    this.officeStaffService.registerOfficeStaff(user, officeStaff, this.photoFile).subscribe({
      next: res => {
        this.message = res.Message || 'Registration successful!';
        this.userForm.reset();
        this.officeStaffForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Registration failed: ' + (err.error?.Message || err.message);
      }
    });
  }


}