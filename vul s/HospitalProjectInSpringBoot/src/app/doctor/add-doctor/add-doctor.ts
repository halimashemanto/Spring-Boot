import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.html',
  styleUrls: ['./add-doctor.css']
})
export class AddDoctor implements OnInit {

  userForm: FormGroup;
  doctorForm: FormGroup;
  photoFile!: File;
  message: string = '';
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private http: HttpClient
  ) {
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
      departmentId: ['', Validators.required],
      joinDate: ['', Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.http.get<any[]>('http://localhost:8080/api/department/').subscribe({
      next: data => this.departments = data,
      error: err => console.error('Error fetching departments', err)
    });
  }

  onPhotoSelected(event: any) {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.photoFile) {
      this.message = 'Please upload a photo.';
      return;
    }

    if (this.userForm.invalid || this.doctorForm.invalid) {
      this.message = 'Please fill all required fields.';
      return;
    }

    const user = { ...this.userForm.value };

    const doctor = {
      name: this.userForm.value.name,      // ⚡ must include
      email: this.userForm.value.email,    // ⚡ mus
      gender: this.doctorForm.value.gender,
      status: this.doctorForm.value.status,
      joinDate: this.doctorForm.value.joinDate,
      study: this.doctorForm.value.study,
      chamber: this.doctorForm.value.chamber,
      department: { id: this.doctorForm.value.departmentId }, // nested object
      phone: this.userForm.value.phone
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
