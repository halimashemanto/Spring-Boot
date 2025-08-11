import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedecineService } from '../medicineService/medecine-service';
import { MedicineModel } from '../model/medicine.model';

@Component({
  selector: 'app-medicine',
  standalone: false,
  templateUrl: './medicine.html',
  styleUrl: './medicine.css'
})
export class Medicine {


  medicines: MedicineModel[] = [];
  mediForm!: FormGroup;
  editMode = false;

  constructor(
    private medicineService: MedecineService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMedicines();

    this.mediForm = this.fb.group({
      id: [null],
      medicineName: ['', Validators.required]
    });
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medicines = data;
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    const medi: MedicineModel = this.mediForm.value;

    if (this.editMode && medi.id) {
      this.medicineService.updateMedicine(medi, medi.id).subscribe(() => {
        this.loadMedicines();
        this.resetForm();
      });
    } else {
      this.medicineService.createMedicine(medi).subscribe(() => {
        this.loadMedicines();
        this.resetForm();
      });
    }
  }

  onEdit(medi: MedicineModel): void {
    this.mediForm.patchValue(medi);
    this.editMode = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe(() => this.loadMedicines());
    }
  }

  resetForm(): void {
    this.mediForm.reset();
    this.editMode = false;
  }



}
