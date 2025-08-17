import { Component } from '@angular/core';
import { Patient } from '../model/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient-service';
import { Department } from '../../department/department/department';
import { Doctor } from '../../doctor/model/doctor.model';

@Component({
  selector: 'app-add-patient',
  standalone: false,
  templateUrl: './add-patient.html',
  styleUrl: './add-patient.css'
})
export class AddPatient {

 patientForm!: FormGroup;
  doctors: Doctor[] = [];
  departments: Department[] = [];
  message: string = '';
  editingPatientId?: number;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDoctors();
    this.loadDepartments();
  }

  initForm() {
    this.patientForm = this.fb.group({
      date: [new Date()],
      name: [''],
      age: [''],
      gender: [''],
      contact: [''],
      address: [''],
      medicalHistory: [''],
      reason: [''],
      status: [''],
      doctor: [''],
      department: ['']
    });
  }

  loadDoctors() {
    this.patientService.getAllDoctors().subscribe({
      next: (res) => this.doctors = res,
      error: (err) => console.error(err)
    });
  }

  loadDepartments() {
    this.patientService.getAllDepartments().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.patientForm.invalid) {
      this.message = 'Please fill all required fields.';
      return;
    }

    const patient: Patient = this.patientForm.value;

    if (this.editingPatientId) {
      // Update existing patient
      this.patientService.updatePatient(this.editingPatientId, patient).subscribe({
        next: (res) => {
          this.message = 'Patient updated successfully!';
          this.patientForm.reset({ status: 'Active', date: new Date() });
          this.editingPatientId = undefined;
        },
        error: (err) => this.message = 'Update failed: ' + err.message
      });
    } else {
      // Create new patient
      this.patientService.createPatient(patient).subscribe({
        next: (res) => {
          this.message = 'Patient added successfully!';
        },
        error: (err) => this.message = 'Creation failed: ' + err.message
      });
    }
  }

  editPatient(patient: Patient) {
    this.editingPatientId = patient.id;
    this.patientForm.patchValue(patient);
  }

}
