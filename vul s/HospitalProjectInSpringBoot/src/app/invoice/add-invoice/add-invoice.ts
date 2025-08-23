import { ChangeDetectorRef, Component } from '@angular/core';


@Component({
  selector: 'app-add-invoice',
  standalone: false,
  templateUrl: './add-invoice.html',
  styleUrl: './add-invoice.css'
})
export class AddInvoice {


  }









































  // invoices: Invoice[] = [];
  // invoiceForm: FormGroup;
  // testPrices: { [id: number]: number } = {}; // Test ID to price mapping
  // totalAmount: number = 0;
  // payable: number = 0;
  // due: number = 0;
  // status: boolean = false;

  // constructor(private invoiceService: InvoiceService, private fb: FormBuilder) {
  //   this.invoiceForm = this.fb.group({
  //     doctorId: [null, Validators.required],
  //     appoinmentId: [null],
  //     testIds: [[]],
  //     discount: [0],
  //     invoiceDate: [new Date().toISOString().substring(0,10), Validators.required],
  //     deliveryDate: [new Date().toISOString().substring(0,10), Validators.required],
  //     deliveryTime: [24, Validators.required],
  //     received: [0]
  //   });
  // }

  // ngOnInit(): void {
  //   this.loadInvoices();

  //   // Whenever testIds or discount changes, recalculate totals
  //   this.invoiceForm.valueChanges.subscribe(val => {
  //     this.calculateTotals(val.testIds, val.discount, val.received);
  //   });
  // }

  // loadInvoices() {
  //   this.invoiceService.getAllInvoices().subscribe(res => this.invoices = res);
  // }

  // submitInvoice() {
  //   if (this.invoiceForm.invalid) return;
  //   const invoice: Invoice = this.invoiceForm.value;
  //   this.invoiceService.createInvoice(invoice).subscribe(res => {
  //     alert('Invoice created!');
  //     this.loadInvoices();
  //     this.invoiceForm.reset({ discount: 0, testIds: [], received: 0, invoiceDate: new Date().toISOString().substring(0,10), deliveryDate: new Date().toISOString().substring(0,10), deliveryTime: 24 });
  //     this.totalAmount = 0;
  //     this.payable = 0;
  //     this.due = 0;
  //     this.status = false;
  //   });
  // }

  // calculateTotals(testIds: number[], discount: number, received: number) {
  //   // Auto set test prices (dummy values, replace with API call if needed)
  //   this.testPrices = { 1: 500, 2: 200, 3: 1000 }; // example prices
  //   this.totalAmount = (testIds || []).reduce((sum, id) => sum + (this.testPrices[id] || 0), 0);
  //   const totalDiscount = discount || 0;
  //   this.payable = this.totalAmount - totalDiscount;
  //   const receivedAmount = received || 0;
  //   this.due = this.payable - receivedAmount;
  //   this.status = this.due <= 0;
  // }

