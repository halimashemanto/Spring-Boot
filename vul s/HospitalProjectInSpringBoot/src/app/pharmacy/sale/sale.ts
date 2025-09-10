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

   selectedSale: any = null; 

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
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      subtotal: [{ value: 0, disabled: false }] // use disabled:false
    });

    // Auto calculate subtotal
    item.get('quantity')?.valueChanges.subscribe(qty => this.calculateItemSubtotal(item));
    item.get('unitPrice')?.valueChanges.subscribe(price => this.calculateItemSubtotal(item));

    this.items.push(item);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  private calculateItemSubtotal(item: FormGroup) {
    const qty = Number(item.get('quantity')?.value) || 0;
    const price = Number(item.get('unitPrice')?.value) || 0;
    item.get('subtotal')?.setValue(qty * price, { emitEvent: false });
    this.cdr.markForCheck();
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, item) => sum + (item.get('subtotal')?.value || 0), 0);
  }

  // ====== Load Data ======
  loadSales(): void {
    this.service.getSales().subscribe(data => { 
      this.sales = data; 
      this.cdr.markForCheck(); });
  }

  loadStocks(): void {
    this.service.getStocks().subscribe(data => { 
      this.stocks = data;
       this.cdr.markForCheck(); });
  }

  loadMedicines(): void {
    this.service.getMedicines().subscribe(data => { 
      this.medicines = data;
       this.cdr.markForCheck(); });
  }

  getStockName(stockId: number): string {
    const stock = this.stocks.find(s => s.id === stockId);
    if (!stock) return 'N/A';
    const med = this.medicines.find(m => m.id === stock.medicineId);
    return med ? med.name : 'N/A';
  }


private setSelectedSale(sale: SaleModel) {
  this.selectedSale = {
    invoiceNo: sale.invoiceNo,
    saleDate: sale.saleDate,
    patientName: sale.patientName,
    items: sale.items,
    totalAmount: sale.totalAmount
  };
}






  // ====== Save Sale ======
saveSale(): void {
  if (this.form.invalid) return;

  const sale: SaleModel = {
    ...this.form.value,
    totalAmount: this.totalAmount
  };

  // stock reduce logic as it is ...

  if (this.editMode && this.editId) {
    this.service.updateSale(this.editId, sale).subscribe(() => {
      this.loadSales();
      this.loadStocks();
      this.setSelectedSale(sale); // ✅ set selectedSale
      this.resetForm();
    });
  } else {
    this.service.createSale(sale).subscribe(() => {
      this.loadSales();
      this.loadStocks();
      this.setSelectedSale(sale); 
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
        quantity: [i.quantity, [Validators.required, Validators.min(1)]],
        unitPrice: [i.unitPrice, [Validators.required, Validators.min(0)]],
        subtotal: [{ value: i.subtotal, disabled: false }]
      });

      item.get('quantity')?.valueChanges.subscribe(qty => this.calculateItemSubtotal(item));
      item.get('unitPrice')?.valueChanges.subscribe(price => this.calculateItemSubtotal(item));

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

  onGeneratePDF(sale: SaleModel) {
  this.setSelectedSale(sale);
  this.generatePDF();
}


  
// ======= PDF generate =======
async generatePDF(): Promise<void> {
  if (!this.invoice) return;

  const invoiceEl = this.invoice.nativeElement as HTMLElement;

  // temporarily show invoice off-screen but visible
  invoiceEl.style.visibility = 'visible';
  invoiceEl.style.position = 'absolute';
  invoiceEl.style.left = '-9999px';
  invoiceEl.style.top = '0';

  // force Angular to render the latest data
  this.cdr.detectChanges();

  // wait a little for DOM to paint
  await new Promise(r => setTimeout(r, 200));

  const canvas = await html2canvas(invoiceEl, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth - 20;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let position = 10;
  let heightLeft = pdfHeight;

  // handle multiple pages
  pdf.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight + 10;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${this.form.value.invoiceNo || 'invoice'}.pdf`);

  // hide again
  invoiceEl.style.visibility = 'hidden';
  invoiceEl.style.position = 'absolute';
  invoiceEl.style.left = '-9999px';
  invoiceEl.style.top = '0';
}


}


