import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PurchaseModel } from '../model/purchase.model';
import { SupplierModel } from '../model/supplier.model';
import { MedicineStockModel } from '../model/medicineStock.model';
import { PharmacyMedicineModel } from '../model/pharmacyMedicine.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyMedicineService } from '../pharmacy-medicine-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-purchase',
  standalone: false,
  templateUrl: './purchase.html',
  styleUrl: './purchase.css'
})
export class Purchase {



  

  @ViewChild('invoice', { static: false }) invoice!: ElementRef;

  purchases: PurchaseModel[] = [];
  suppliers: SupplierModel[] = [];
  stocks: MedicineStockModel[] = [];
  medicines: PharmacyMedicineModel[] = [];

  form: FormGroup;
  editMode = false;
  editId?: number;

    selectedPurchase: PurchaseModel | null = null;

  constructor(private service: PharmacyMedicineService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      supplierId: [null, Validators.required],
      invoiceNo: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadPurchases();
    this.loadSuppliers();
    this.loadStocks();
    this.loadMedicines();
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      medicineStockId: [null, Validators.required],
      quantity: [0, Validators.required],
      unitPrice: [0, Validators.required],
      subtotal: [{ value: 0, disabled: true }]
    });

    item.get('quantity')?.valueChanges.subscribe(qty => {
      const quantity = Number(qty) || 0;
      const unitPrice = Number(item.get('unitPrice')?.value) || 0;
      item.get('subtotal')?.setValue(quantity * unitPrice, { emitEvent: false });
      this.cdr.markForCheck();
    });

    item.get('unitPrice')?.valueChanges.subscribe(price => {
      const unitPrice = Number(price) || 0;
      const quantity = Number(item.get('quantity')?.value) || 0;
      item.get('subtotal')?.setValue(quantity * unitPrice, { emitEvent: false });
      this.cdr.markForCheck();
    });

    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

 // Load all purchases
  loadPurchases() {
    this.service.getPurchases().subscribe({
      next: (data) => {


        this.purchases = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)

      }



    });




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
  // Load all stock
  loadStocks() {
    this.service.getStocks().subscribe({
      next: (data) => {


        this.stocks = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.log(err)

      }



    });




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

  getStockName(stockId: number): string {
    const stock = this.stocks.find(s => s.id === stockId);
    if (!stock) return 'N/A';
    const med = this.medicines.find(m => m.id === stock.medicineId);
    return med ? med.name : 'N/A';
  }

  getSupplierName(id: number): string {
    const s = this.suppliers.find(s => s.id === id);
    return s ? s.name : 'N/A';
  }

  getSupplierContact(id: number): string {
    const s = this.suppliers.find(s => s.id === id);
    return s ? s.contactPerson : 'N/A';
  }

  get selectedSupplier() {
    if (!this.form.value || !this.form.value.supplierId || !this.suppliers) return null;
    return this.suppliers.find(s => s.id === this.form.value.supplierId) || null;
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, item) => sum + (item.get('subtotal')?.value || 0), 0);
  }

 getSubtotal(item: any): number {
  const qty = Number(item.quantity || item.get('quantity')?.value || 0);
  const price = Number(item.unitPrice || item.get('unitPrice')?.value || 0);
  return qty * price;
}



  savePurchase() {
    if (this.form.invalid) return;

    const pur: PurchaseModel = { ...this.form.value, totalAmount: this.totalAmount };

    if (this.editMode && this.editId) {
      this.service.updatePurchase(this.editId, pur).subscribe(() => {
        this.loadPurchases();
        this.resetForm();
      });
    } else {
      this.service.createPurchase(pur).subscribe(() => {
        this.loadPurchases();
        this.resetForm();
      });
    }
    this.cdr.markForCheck();
  }

  editPurchase(pur: PurchaseModel) {
    this.editMode = true;
    this.editId = pur.id;

    this.form.patchValue({
      supplierId: pur.supplierId,
      invoiceNo: pur.invoiceNo,
      purchaseDate: pur.purchaseDate
    });

    this.items.clear();
    pur.items?.forEach(i => {
      const item = this.fb.group({
        medicineStockId: [i.medicineStockId, Validators.required],
        quantity: [i.quantity, Validators.required],
        unitPrice: [i.unitPrice, Validators.required],
        subtotal: [{ value: i.subtotal, disabled: true }]
      });

      item.get('quantity')?.valueChanges.subscribe(qty => {
        const quantity = Number(qty) || 0;
        const unitPrice = Number(item.get('unitPrice')?.value) || 0;
        item.get('subtotal')?.setValue(quantity * unitPrice, { emitEvent: false });
        this.cdr.markForCheck();
      });

      item.get('unitPrice')?.valueChanges.subscribe(price => {
        const unitPrice = Number(price) || 0;
        const quantity = Number(item.get('quantity')?.value) || 0;
        item.get('subtotal')?.setValue(quantity * unitPrice, { emitEvent: false });
        this.cdr.markForCheck();
      });

      this.items.push(item);
    });
  }

  deletePurchase(id?: number) {
    if (!id) return;
    this.service.deletePurchase(id).subscribe(() => this.loadPurchases());
  }

  resetForm() {
    this.form.reset();
    this.items.clear();
    this.editMode = false;
    this.editId = undefined;
  }

  // ===== PDF generate with subtotal =====
  generatePDF(): void {
    if (!this.invoice) return;

    const DATA: any = this.invoice.nativeElement;

    html2canvas(DATA, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save(`${this.form.value.invoiceNo || 'purchase'}.pdf`);
    });
  }
}