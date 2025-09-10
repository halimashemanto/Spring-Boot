import { ChangeDetectorRef, Component } from '@angular/core';
import { PharmacyMedicineModel } from '../model/pharmacyMedicine.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyMedicineService } from '../pharmacy-medicine-service';
import { MedicineStockModel } from '../model/medicineStock.model';

@Component({
  selector: 'app-medicine-stock',
  standalone: false,
  templateUrl: './medicine-stock.html',
  styleUrl: './medicine-stock.css'
})
export class MedicineStock {

 stocks: MedicineStockModel[] = [];
  medicines: PharmacyMedicineModel[] = [];
  form: FormGroup;
  editMode = false;
  editId?: number;

  constructor(
    private service: PharmacyMedicineService, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      medicineId: [null, Validators.required],
      batchNo: ['', Validators.required],
      expiryDate: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      subtotal: [{ value: 0, disabled: true }]
    });

    // subtotal auto calculate
    this.form.get('quantity')?.valueChanges.subscribe(() => this.calculateSubtotal());
    this.form.get('purchasePrice')?.valueChanges.subscribe(() => this.calculateSubtotal());
  }

  ngOnInit() {
    this.loadStocks();
    this.loadMedicines();
  }

  // Load all stocks
  loadStocks() {
    this.service.getStocks().subscribe({
      next: data => {
        this.stocks = data;
        this.cdr.markForCheck();
      },
      error: err => console.error('Error loading stocks:', err)
    });
  }

  // Load medicines for dropdown
  loadMedicines() {
    this.service.getMedicines().subscribe({
      next: data => {
        this.medicines = data;
        this.cdr.markForCheck();
      },
      error: err => console.error('Error loading medicines:', err)
    });
  }

  getMedicineName(medicineId: number): string {
    const med = this.medicines.find(m => m.id === medicineId);
    return med ? med.name : 'N/A';
  }

  // subtotal calculation
  calculateSubtotal() {
    const quantity = Number(this.form.get('quantity')?.value) || 0;
    const price = Number(this.form.get('purchasePrice')?.value) || 0;
    this.form.get('subtotal')?.setValue(quantity * price, { emitEvent: false });
  }

  // Save or Update stock
  saveStock() {
    if (this.form.invalid) return;

    const stock: MedicineStockModel = { ...this.form.value };

    if (this.editMode && this.editId) {
      this.service.updateStock(this.editId, stock).subscribe({
        next: () => {
          this.loadStocks();
          this.resetForm();
        },
        error: err => console.error('Error updating stock:', err)
      });
    } else {
      this.service.createStock(stock).subscribe({
        next: () => {
          this.loadStocks();
          this.resetForm();
        },
        error: err => console.error('Error creating stock:', err)
      });
    }
  }

  // Edit stock
  editStock(stock: MedicineStockModel) {
    this.editMode = true;
    this.editId = stock.id;
    this.form.patchValue(stock);
    this.calculateSubtotal(); // ensure subtotal updates
  }

  // Delete stock
  deleteStock(id?: number) {
    if (!id) return;
    this.service.deleteStock(id).subscribe({
      next: () => this.loadStocks(),
      error: err => console.error('Error deleting stock:', err)
    });
  }

  // Reset form
  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.editId = undefined;
    this.form.get('subtotal')?.setValue(0);
  }

}