import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedecineService } from '../medicineService/medecine-service';

@Component({
  selector: 'app-medicine',
  standalone: false,
  templateUrl: './medicine.html',
  styleUrl: './medicine.css'
})
export class Medicine {

  medi: Medicine[] = [];
  mediForm!: FormGroup;

  mediId !: number;
  editMode = false;

  constructor(private medicineService: MedecineService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadMedicine();

    this.mediForm = this.fb.group({
      id: [], // let JSON Server auto-generate or handle manually
      medicineName: ['', Validators.required]
      
    });
  }

  loadMedicine(): void {
    this.medicineService.getAllMedicine().subscribe(data => {
      this.medi = data;
      this.cdr.markForCheck();
    });
  }

  // onSubmit(): void {
  //   const medi: Medicine = this.mediForm.value;


  //   if (this.editMode) {
  //     this.medicineService.updateMedicine(medi).subscribe(() => {
  //       this.loadMedicine();
  //       this.mediForm.reset();
  //       this.editMode = false;
  //     });
  //   } else {
  //     this.medicineService.createMedicine(medi).subscribe(() => {
  //       this.loadMedicine();
  //       this.mediForm.reset();
  //     });
  //   }
  // }

  onEdit(medi: Medicine): void {
    this.mediForm.patchValue(medi);
    this.editMode = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this Medicine Name?')) {
      this.medicineService.deleteMedicine(id).subscribe(() => this.loadMedicine());
    }
  }
}
