import { ChangeDetectorRef, Component } from '@angular/core';
import { Patient } from '../model/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient-service';
import { Department } from '../../department/department/department';
import { Doctor } from '../../doctor/model/doctor.model';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-patient',
  standalone: false,
  templateUrl: './add-patient.html',
  styleUrl: './add-patient.css'
})
export class AddPatient {


  patients: Patient[] = [];
  doctors: Doctor[] = [];
  departments: any[] = [];

  patientForm!: FormGroup;
  isEditing: boolean = false;
  selectedId?: number;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.loadDepartments();

    this.patientForm = this.fb.group({
      date: [''],
      name: [''],
      age: [''],
      gender: [''],
      contact: [''],
      address: [''],
      medicalHistory: [''],
      reason: [''],
      status: [''],
      doctor: [null],
      department: [null]
    });
  }
  

 
  loadPatients() {
    this.patientService.getAll().subscribe(data => {
      this.patients = data;
              this.cdr.markForCheck();

    });
  }


  loadDoctors() {
    this.http.get<Doctor[]>('http://localhost:8080/api/doctor/')
      .subscribe(data => {
        this.doctors = data;
        this.cdr.markForCheck();
      });
  }



  loadDepartments() {
    this.http.get<any[]>('http://localhost:8080/api/department/').subscribe({
      next: data => this.departments = data,
      error: err => console.error('Error fetching departments', err)
    });
  }
  

 
  onSubmit() {
    if (this.patientForm.invalid) return;

    const patient: Patient = this.patientForm.value;

    if (this.isEditing && this.selectedId) {
      this.patientService.update(this.selectedId, patient).subscribe(() => {
        this.loadPatients();
        this.resetForm();
      });
    } else {
      this.patientService.create(patient).subscribe(() => {
        this.loadPatients();
        this.resetForm();
      });
    }
  }

  editPatient(p: Patient) {
    this.isEditing = true;
    this.selectedId = p.id;
    this.patientForm.patchValue(p);
  }

  deletePatient(id?: number) {
    if (!id) return;
    this.patientService.delete(id).subscribe(() => {
      this.loadPatients();
    });
  }

  resetForm() {
    this.isEditing = false;
    this.selectedId = undefined;
        this.patientForm.reset();
}
}