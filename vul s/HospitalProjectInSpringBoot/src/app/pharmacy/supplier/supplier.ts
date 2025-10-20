import { ChangeDetectorRef, Component } from '@angular/core';
import { SupplierModel } from '../model/supplier.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyMedicineService } from '../pharmacy-medicine-service';

@Component({
  selector: 'app-supplier',
  standalone: false,
  templateUrl: './supplier.html',
  styleUrl: './supplier.css'
})
export class Supplier {

  suppliers: SupplierModel[] = [];
  form: FormGroup;
  editMode = false;
  editId?: number;

  constructor(private service: PharmacyMedicineService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSuppliers();
          this.cdr.markForCheck();

  }

  loadSuppliers() {
    this.service.getSuppliers().subscribe({
     next: (data) => {


        this.suppliers = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)
      }
 });
      
  }

  saveSupplier() {
    if (this.form.invalid) return;

    const sup: SupplierModel = this.form.value;

    if (this.editMode && this.editId) {
      this.service.updateSupplier(this.editId, sup).subscribe(() => {
        this.loadSuppliers();
        this.resetForm();
      });
    } else {
      this.service.createSupplier(sup).subscribe(() => {
        this.loadSuppliers();
        this.resetForm();
      });
            this.cdr.markForCheck();

    }
  }

  editSupplier(sup: SupplierModel) {
    this.editMode = true;
    this.editId = sup.id;
    this.form.patchValue(sup);
  }

  deleteSupplier(id?: number) {
    if (!id) return;
    this.service.deleteSupplier(id).subscribe(() => this.loadSuppliers());
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.editId = undefined;
  }


}
