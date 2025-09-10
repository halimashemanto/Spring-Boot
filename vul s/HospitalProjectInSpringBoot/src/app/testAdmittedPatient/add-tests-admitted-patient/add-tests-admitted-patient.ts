import { Component } from '@angular/core';
import { TestAssignedDTO, TestInfo } from '../model/testAdmittedPatient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestsAdmittedPatientService } from '../tests-admitted-patient-service';
import { debounceTime, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-tests-admitted-patient',
  standalone: false,
  templateUrl: './add-tests-admitted-patient.html',
  styleUrl: './add-tests-admitted-patient.css'
})
export class AddTestsAdmittedPatient {


form: FormGroup;
  assignedTest: TestAssignedDTO | null = null;
  patientInfoLoaded = false;
  allTests: TestInfo[] = [];

  constructor(private fb: FormBuilder, private service: TestsAdmittedPatientService) {
    this.form = this.fb.group({
      bedBookingId: [null, Validators.required],
      testIds: [[]],
    });
  }

  ngOnInit(): void {
    this.loadAllTests();

    // Auto load patient info
    this.form.get('bedBookingId')?.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((id: number) => {
          if (!id) return of(null);
          return this.service.getTestsByBed(id);
        })
      )
      .subscribe(res => {
        if (res) {
          this.assignedTest = res;
          this.patientInfoLoaded = true;
          this.form.get('testIds')?.setValue([]);
        } else {
          this.assignedTest = null;
          this.patientInfoLoaded = false;
        }
      });
  }

  loadAllTests() {
    this.service.getAllMasterTests().subscribe(res => {
      this.allTests = res;
    });
  }

  saveTests() {
    if (this.form.invalid) return;

    const dto: TestAssignedDTO = {
      bedBookingId: this.form.value.bedBookingId,
      testIds: this.form.value.testIds
    };

    this.service.assignTests(dto).subscribe(res => {
      alert('Tests assigned successfully!');
      this.assignedTest = res;
      this.form.get('testIds')?.setValue([]);
    });
  }

  resetForm() {
    this.form.reset({ testIds: [] });
    this.assignedTest = null;
    this.patientInfoLoaded = false;
  }

  get subtotal(): number {
    if (!this.form.value.testIds || this.allTests.length === 0) return 0;
    return this.allTests
      .filter(t => this.form.value.testIds.includes(t.id))
      .reduce((sum, t) => sum + t.testPrice, 0);
  }
}
