import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyMedicineService } from '../pharmacy-medicine-service';
import { PharmacyMedicineModel } from '../model/pharmacyMedicine.model';

@Component({
  selector: 'app-pharmacy-medicine',
  standalone: false,
  templateUrl: './pharmacy-medicine.html',
  styleUrl: './pharmacy-medicine.css'
})
export class PharmacyMedicine {


  medicines: PharmacyMedicineModel[] = [];
  form: FormGroup;
  editMode = false;
  editId?: number;

  constructor(private service: PharmacyMedicineService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      genericName: ['', Validators.required],
      strength: ['', Validators.required],
      unit: ['', Validators.required],
      sku: ['', Validators.required],
      sellingPrice: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.loadMedicines();
    this.cdr.markForCheck();
  }

  // Load all medicines
  loadMedicines() {
    this.service.getMedicines().subscribe({
      next: (data) => {


        this.medicines = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)

      }



    });




  }

  // Save or Update
  saveMedicine() {
    if (this.form.invalid) return;

    const med: PharmacyMedicineModel = this.form.value;

    if (this.editMode && this.editId) {
      this.service.updateMedicine(this.editId, med).subscribe(() => {
        this.loadMedicines();
        this.resetForm();
      });
    } else {
      this.service.createMedicine(med).subscribe(() => {
        this.loadMedicines();
        this.resetForm();
      });
    }
    this.cdr.markForCheck();
  }

  // Edit medicine
  editMedicine(med: PharmacyMedicineModel) {
    this.editMode = true;
    this.editId = med.id;
    this.form.patchValue(med);
  }

  // Delete medicine
  deleteMedicine(id?: number) {
    if (!id) return;
    this.service.deleteMedicine(id).subscribe(() => this.loadMedicines());
  }

  // Reset form
  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.editId = undefined;
  }

}
