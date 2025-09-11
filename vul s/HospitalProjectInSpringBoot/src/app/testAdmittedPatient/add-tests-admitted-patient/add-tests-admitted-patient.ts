import { Component } from '@angular/core';
import { TestAdmittedPatient, TestInfo } from '../model/testAdmittedPatient.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestsAdmittedPatientService } from '../tests-admitted-patient-service';
import { TestMasterService } from '../../testMaster/test-master-service';

@Component({
  selector: 'app-add-tests-admitted-patient',
  standalone: false,
  templateUrl: './add-tests-admitted-patient.html',
  styleUrl: './add-tests-admitted-patient.css'
})
export class AddTestsAdmittedPatient {


  form: FormGroup;
  allTests: TestInfo[] = [];
  totalCost: number = 0;
  patientDetails?: TestAdmittedPatient;

  constructor(
    private fb: FormBuilder,
    private service: TestsAdmittedPatientService,
    private testMasterService: TestMasterService
  ) {
    this.form = this.fb.group({
      bedBookingId: ['', Validators.required],
      patientName: [''],
      age: [''],
      phone: [''],
      address: [''],
      tests: this.fb.array([])
    });
  }

  ngOnInit(): void {
    
    // Load all tests from Test Master
    this.testMasterService.getAllTests().subscribe(tests => {
      this.allTests = tests.map(t => ({
        id: t.id,
        testName: t.testName,
        testPrice: t.testPrice
      } as TestInfo));
    });

    // BedBooking ID changes
    this.form.get('bedBookingId')?.valueChanges.subscribe(id => {
      if (id) this.loadPatient(id);
    });
  }

  // Getter for FormArray
  get tests(): FormArray {
    return this.form.get('tests') as FormArray;
  }

  // Load patient details without pre-filling selected tests
  loadPatient(bedBookingId: number) {
    this.service.getPatientByBed(bedBookingId).subscribe(patient => {
      this.patientDetails = patient;
      this.form.patchValue({
        patientName: patient.patientName,
        age: patient.age,
        phone: patient.phone,
        address: patient.address
      });

      // Clear previous selections
      this.tests.clear();
      this.totalCost = 0;
    });
  }

  // Check if test is selected
  isSelected(testId: number): boolean {
    return this.tests.controls.some(c => c.value.testId === testId);
  }

  // Toggle test selection
  onTestToggle(event: any, test: TestInfo) {
    if (event.target.checked) {
      if (!this.isSelected(test.id)) {
        this.tests.push(this.fb.group({
          testId: [test.id],
          testName: [test.testName],
          testPrice: [test.testPrice]
        }));
      }
    } else {
      const index = this.tests.controls.findIndex(c => c.value.testId === test.id);
      if (index !== -1) {
        this.tests.removeAt(index);
      }
    }
    this.calculateTotal();
  }

  removeTest(index: number) {
    this.tests.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalCost = this.tests.controls
      .map(c => c.value.testPrice)
      .reduce((a, b) => a + b, 0);
  }

  save() {
    const dto: TestAdmittedPatient = {
      bedBookingId: this.form.value.bedBookingId,
      testIds: this.tests.controls.map(c => c.value.testId)
    };

    this.service.savePatientTests(dto).subscribe(res => {
      this.patientDetails = res;

      // Update table with saved tests
      this.tests.clear();
      (res.selectedTests || []).forEach(t => {
        this.tests.push(this.fb.group({
          testId: [t.id],
          testName: [t.testName],
          testPrice: [t.testPrice]
        }));
      });

      this.calculateTotal();
      alert('Saved successfully!');
    });

    this.resetForm();
  }

  resetForm() {

    this.tests.clear();
    this.totalCost = 0;
    this.form.patchValue({ bedBookingId: '' });
  }

}













// form: FormGroup;
//   allTests: TestInfo[] = [];
//   totalCost: number = 0;
//   patientDetails?: TestAdmittedPatient;
//   selectedTestId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private service: TestsAdmittedPatientService,
//     private testMasterService: TestMasterService
//   ) {
//     this.form = this.fb.group({
//       bedBookingId: ['', Validators.required],
//       patientName: [''],
//       age: [''],
//       phone: [''],
//       address: [''],
//       tests: this.fb.array([])
//     });
//   }

//   ngOnInit(): void {
//     // Load all tests from Test Master
//     this.testMasterService.getAllTests().subscribe(tests => {
//       // Convert TestMaster to TestInfo if necessary
//       this.allTests = tests.map(t => ({
//         id: t.id,
//         testName: t.testName,  // ensure TestMaster e thik property name
//         testPrice: t.testPrice
//       } as TestInfo));

//     });

//     // BedBooking ID changes
//     this.form.get('bedBookingId')?.valueChanges.subscribe(id => {
//       if (id) this.loadPatient(id);
//     });
//   }

//   get tests(): FormArray {
//     return this.form.get('tests') as FormArray;
//   }

//   loadPatient(bedBookingId: number) {
//     this.service.getPatientByBed(bedBookingId).subscribe(patient => {
//       this.patientDetails = patient;
//       this.form.patchValue({
//         patientName: patient.patientName,
//         age: patient.age,
//         phone: patient.phone,
//         address: patient.address
//       });

//       // Prefill previously selected tests
//       this.tests.clear();
//       (patient.selectedTests || []).forEach(t => {
//         this.tests.push(this.fb.group({
//           testId: [t.id],
//           testName: [t.testName],
//           testPrice: [t.testPrice]
//         }));
//       });

//       this.calculateTotal();
//     });
//   }

//   // Check if test already selected
// isSelected(testId: number): boolean {
//   return this.tests.controls.some(c => c.value.testId === testId);
// }

// // Toggle test selection
// onTestToggle(event: any, test: TestInfo) {
//   if (event.target.checked) {
//     // Add test
//     if (!this.isSelected(test.id)) {
//       this.tests.push(this.fb.group({
//         testId: [test.id],
//         testName: [test.testName],
//         testPrice: [test.testPrice]
//       }));
//     }
//   } else {
//     // Remove test
//     const index = this.tests.controls.findIndex(c => c.value.testId === test.id);
//     if (index !== -1) {
//       this.tests.removeAt(index);
//     }
//   }
//   this.calculateTotal(); // update total immediately
// }


//   removeTest(index: number) {
//     this.tests.removeAt(index);
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     this.totalCost = this.tests.controls
//       .map(c => c.value.testPrice)
//       .reduce((a, b) => a + b, 0);
//   }

//   save() {
//   const dto: TestAdmittedPatient = {
//     bedBookingId: this.form.value.bedBookingId,
//     testIds: this.tests.controls.map(c => c.value.testId)
//   };

//   this.service.savePatientTests(dto).subscribe(res => {
//     // Update patientDetails with backend response
//     this.patientDetails = res;

//     // Clear current FormArray and reload selected tests from response
//     this.tests.clear();
//     (res.selectedTests || []).forEach(t => {
//       this.tests.push(this.fb.group({
//         testId: [t.id],
//         testName: [t.testName],
//         testPrice: [t.testPrice]
//       }));
//     });

//     this.calculateTotal(); // update total
//     alert('Saved successfully!');
//   });


