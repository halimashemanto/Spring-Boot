import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PharmacyMedicineService } from '../pharmacy-medicine-service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyMedicineModel } from '../model/pharmacyMedicine.model';
import { MedicineStockModel } from '../model/medicineStock.model';
import { SaleModel } from '../model/sale.model';
import { SaleItem } from '../model/saleItem.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-sale',
  standalone: false,
  templateUrl: './sale.html',
  styleUrl: './sale.css'
})
export class Sale {



  @ViewChild('invoice', { static: false }) invoice!: ElementRef;

  sales: SaleModel[] = [];
  stocks: MedicineStockModel[] = [];
  medicines: PharmacyMedicineModel[] = [];

  form: FormGroup;
  editMode = false;
  editId?: number;

  constructor(
    private fb: FormBuilder,
    private service: PharmacyMedicineService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      invoiceNo: ['', Validators.required],
      saleDate: ['', Validators.required],
      patientName: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSales();
    this.loadStocks();
    this.loadMedicines();
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
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

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  loadSales(): void {
    this.service.getSales().subscribe(data => {
      this.sales = data;
      this.cdr.markForCheck();
    });
  }

  loadStocks(): void {
    this.service.getStocks().subscribe(data => {
      this.stocks = data;
      this.cdr.markForCheck();
    });
  }

  loadMedicines(): void {
    this.service.getMedicines().subscribe(data => {
      this.medicines = data;
      this.cdr.markForCheck();
    });
  }

  getStockName(stockId: number): string {
    const stock = this.stocks.find(s => s.id === stockId);
    if (!stock) return 'N/A';
    const med = this.medicines.find(m => m.id === stock.medicineId);
    return med ? med.name : 'N/A';
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, item) => sum + (item.get('subtotal')?.value || 0), 0);
  }

  saveSale(): void {
    if (this.form.invalid) return;

    const sale: SaleModel = {
      ...this.form.value,
      totalAmount: this.totalAmount
    };

    if (this.editMode && this.editId) {
      this.service.updateSale(this.editId, sale).subscribe(() => {
        this.loadSales();
        this.resetForm();
      });
    } else {
      this.service.createSale(sale).subscribe(() => {
        this.loadSales();
        this.resetForm();
      });
    }
  }

  editSale(sale: SaleModel): void {
    this.editMode = true;
    this.editId = sale.id;

    this.form.patchValue({
      invoiceNo: sale.invoiceNo,
      saleDate: sale.saleDate,
      patientName: sale.patientName
    });

    this.items.clear();
    sale.items?.forEach((i: SaleItem) => {
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

  deleteSale(id?: number): void {
    if (!id) return;
    this.service.deleteSale(id).subscribe(() => this.loadSales());
  }

  resetForm(): void {
    this.form.reset();
    this.items.clear();
    this.editMode = false;
    this.editId = undefined;
  }

  // ======= PDF generate =======
  generatePDF(): void {
    if (!this.invoice) return;

    const DATA: any = this.invoice.nativeElement;

    html2canvas(DATA, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20; // 10mm margin left/right
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 10; // top margin
      pdf.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
      pdf.save(`${this.form.value.invoiceNo || 'invoice'}.pdf`);
    });
  }
}
