import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineAdmitedPatient, PatientMedicineDetails } from '../model/medicineAdmitedPatient.model';
import { PharmacyMedicineModel } from '../../pharmacy/model/pharmacyMedicine.model';
import { MedicineAdmitedPatientService } from '../medicine-admited-patient-service';

@Component({
  selector: 'app-add-medicine-admited-patient',
  standalone: false,
  templateUrl: './add-medicine-admited-patient.html',
  styleUrl: './add-medicine-admited-patient.css'
})
export class AddMedicineAdmitedPatient implements OnInit {


  form: FormGroup;
  bedBookingId?: number;

  patientDetails: any = {
    patientName: '',
    age: 0,
    phone: '',
    address: '',
    medicines: []
  };

  medicines: PharmacyMedicineModel[] = [];
  totalCost: number = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private service: MedicineAdmitedPatientService,
    
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      medicines: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadAllMedicines();
  }

  get medicineForms(): FormArray {
    return this.form.get('medicines') as FormArray;
  }

  loadAllMedicines() {
  this.service.getMedicines().subscribe({
    next: data => {
      this.medicines = data;
      this.cdr.markForCheck(); 
    },
    error: _ => this.errorMessage = 'Could not load medicines'
  });
}


  // Load patient info + existing medicines
  loadPatientDetails() {
    if (!this.bedBookingId || this.bedBookingId <= 0) return;

    this.loading = true;
    this.errorMessage = '';

    this.service.getPatientByBedBooking(this.bedBookingId).subscribe({
      next: data => {
        this.patientDetails = data;
        this.calculateTotal();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: _ => {
        this.errorMessage = 'Could not load patient details';
        this.loading = false;
      }
    });
  }

  addMedicineRow() {
    const row = this.fb.group({
      pharmacyMedicineId: ['', Validators.required],
      medicineName: [''],
      sellingPrice: [0],
      quantity: [1, Validators.min(1)],
      applyWay: [''],
      totalCost: [0]
    });
    this.medicineForms.push(row);
  }

  removeMedicineRow(i: number) {
    this.medicineForms.removeAt(i);
    this.calculateTotal();
  }

  onMedicineChange(i: number) {
    const row = this.medicineForms.at(i);
    const selected = this.medicines.find(m => m.id === +row.value.pharmacyMedicineId);
    if (selected) {
      row.patchValue({
        medicineName: selected.name,
        sellingPrice: selected.sellingPrice,
        totalCost: selected.sellingPrice * row.value.quantity
      });
      this.calculateTotal();
    }
  }

  onQuantityChange(i: number) {
    const row = this.medicineForms.at(i);
    row.patchValue({
      totalCost: row.value.quantity * row.value.sellingPrice
    });
    this.calculateTotal();
  }

  calculateTotal() {
    const formTotal = this.medicineForms.value.reduce((sum: number, m: any) => sum + (m.totalCost || 0), 0);
    const existingTotal = this.patientDetails.medicines.reduce((sum: number, m: any) => sum + (m.totalCost || 0), 0);
    this.totalCost = formTotal + existingTotal;
  }

  saveMedicines() {
    if (!this.bedBookingId) return;

    const medicinesToSave: MedicineAdmitedPatient[] = this.medicineForms.value.map((m: any) => ({
      bedBookingId: this.bedBookingId!,
      pharmacyMedicineId: m.pharmacyMedicineId,
      applyWay: m.applyWay,
      quantity: m.quantity,
      totalCost: m.totalCost,
      date: new Date()
    }));

    medicinesToSave.forEach(med => {
      this.service.addMedicine(med).subscribe({
        next: _ => {
          this.form.reset();
          this.medicineForms.clear();
          this.loadPatientDetails();
        },
        error: _ => this.errorMessage = 'Could not save medicine'
      });
    });
  }

}




























// form: FormGroup;
// bedBookingId?: number;
// patientMedicines: MedicineAdmitedPatient[] = [];
// medicines: PharmacyMedicineModel[] = [];
// totalCost: number = 0;
// loading = false;
// errorMessage = '';

// constructor(
//   private fb: FormBuilder,
//   private service: MedicineAdmitedPatientService,
//   private cdr: ChangeDetectorRef
// ) {
//   this.form = this.fb.group({
//     pharmacyMedicineId: ['', Validators.required],
//     quantity: [1, [Validators.required, Validators.min(1)]],
//     applyWay: ['', Validators.required],
//     date: [new Date().toISOString().split('T')[0], Validators.required] // default today
//   });
// }

// ngOnInit(): void {
//   this.loadMedicines();
// }

// loadMedicines() {
//   this.service.getMedicines().subscribe({
//     next: data => {
//       this.medicines = data;
//       this.cdr.markForCheck();
//     },
//     error: _ => this.errorMessage = 'Could not load medicines'
//   });
// }

// loadPatientMedicines() {
//   if (!this.bedBookingId) return;
//   this.loading = true;
//   this.service.getPatientMedicines(this.bedBookingId).subscribe({
//     next: data => {
//       this.patientMedicines = data;
//       this.calculateTotalCost();
//       this.loading = false;
//       this.cdr.markForCheck();
//     },
//     error: _ => {
//       this.errorMessage = 'Could not load patient medicines';
//       this.loading = false;
//     }
//   });
// }

// addMedicine() {
//   if (!this.bedBookingId || this.form.invalid) return;

//   const med: MedicineAdmitedPatient = {
//     ...this.form.value,
//     bedBookingId: this.bedBookingId,
//     totalCost: 0 // backend will calculate
//   };

//   this.service.addMedicine(med).subscribe({
//     next: _ => {
//       this.form.reset({ quantity: 1, date: new Date().toISOString().split('T')[0] });
//       this.loadPatientMedicines();
//     },
//     error: _ => this.errorMessage = 'Could not add medicine'
//   });
// }

// deleteMedicine(id: number) {
//   this.service.deleteMedicine(id).subscribe({
//     next: _ => this.loadPatientMedicines(),
//     error: _ => this.errorMessage = 'Could not delete medicine'
//   });
// }

// calculateTotalCost() {
//   this.totalCost = this.patientMedicines.reduce((sum, m) => sum + (m.totalCost || 0), 0);
// }

// getSelectedMedicinePrice(): number {
//   const medId = this.form.get('pharmacyMedicineId')?.value;
//   const med = this.medicines.find(m => m.id == medId);
//   return med ? med.sellingPrice : 0;
// }

// getCalculatedCost(): number {
//   const qty = this.form.get('quantity')?.value || 0;
//   return this.getSelectedMedicinePrice() * qty;
// }


