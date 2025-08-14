import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceptionistService } from '../receptionist-service';

@Component({
  selector: 'app-receptionist-registration',
  standalone: false,
  templateUrl: './receptionist-registration.html',
  styleUrl: './receptionist-registration.css'
})
export class ReceptionistRegistration {

  userForm: FormGroup;
  receptionistForm: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(private fb: FormBuilder,
    private receptionistService: ReceptionistService) {


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.receptionistForm = this.fb.group({
      gender: [''],
      phone:[''],
      address: [''],
      status: [''],
      joinDate: ['']
      
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
    if (this.userForm.invalid || this.receptionistForm.invalid) {
      this.message = 'Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'Receptionist' // adjust if necessary
    };

    const receptionist = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.receptionistForm.value.gender,
      status: this.receptionistForm.value.status,
      joinDate: this.receptionistForm.value.joinDate,
      address: this.receptionistForm.value.address,
    };

    this.receptionistService.registerReceptionist(user, receptionist, this.photoFile).subscribe({
      next: res => {
        this.message = res.Message || 'Registration successful!';
        this.userForm.reset();
        this.receptionistForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Registration failed: ' + (err.error?.Message || err.message);
      }
    });
  }


}
