import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../prescription-service';
import { PrescriptionDTO } from '../model/prescription.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { AppoinmentDTO } from '../../Appoinment/model/appoinmentDTO';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppoinmentService } from '../../Appoinment/appoinment-service';
import { Test } from '../../test/model/test.model';
import { MedicineModel } from '../../test/model/medicine.model';




interface Doctor {
  id: number;
  name: string;
}





@Component({
  selector: 'app-add-prescription',
  standalone: false,
  templateUrl: './add-prescription.html',
  styleUrl: './add-prescription.css'
})
export class AddPrescription implements OnInit {


  appoinment?: AppoinmentDTO;

  form!: FormGroup;



  prescription: PrescriptionDTO = {
    id: 0,
    patientName: '',
    patientAge: 0,
    patientContact: '',
    doctorId: 0,
    note: '',
    advice: '',
    height: '',
    weight: '',
    bp: '',
    applyWay: '',
    medicineIds: [],
    testIds: []
  };

  selectedAppointmentId!: number;



  doctors: Doctor[] = [];
  medicines: MedicineModel[] = [];
  tests: Test[] = [];
  selectedMedicines: MedicineModel[] = [];
  selectedTests: Test[] = [];

  constructor(private prescriptionService: PrescriptionService,
    private appoinmentService: AppoinmentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {


  }

  ngOnInit(): void {




    // fetch doctors
    this.http.get<Doctor[]>('http://localhost:8080/api/doctor/').subscribe(data => this.doctors = data);
    // fetch medicines

    // fetch tests
    this.getAllMedicine();
    this.getAllTest();

  }



  getAllMedicine() {

    this.http.get<MedicineModel[]>('http://localhost:8080/api/medicine/').subscribe(data => {
      this.medicines = data,
        console.log(this.medicines)
      this.cd.markForCheck();
    });

  }



  getAllTest() {

    this.http.get<Test[]>('http://localhost:8080/api/tests/').subscribe(data => {
      this.tests = data;
      console.log(this.tests)

      this.cd.markForCheck();
    });


  }

  // Auto-fill patient name and age
  onPatientContactChange() {
    if (this.prescription.patientContact.length >= 3) {
      this.http.get<any>(`http://localhost:8080/api/patient/contact/${this.prescription.patientContact}`)
        .subscribe(data => {
          if (data) {
            this.prescription.patientName = data.name;
            this.prescription.patientAge = data.age;
          }
        });
    }
  }

  addMedicine(m: MedicineModel) {
    if (!this.selectedMedicines.find(med => med.id === m.id)) {
      this.selectedMedicines.push(m);
      this.prescription.medicineIds.push(m.id);
    }
  }
  onMedicineSelect(event: any) {
    const medId = +event.target.value; // convert to number
    const med = this.medicines.find(m => m.id === medId);
    if (med) {
      this.addMedicine(med);
    }
    // reset select
    event.target.value = '';
  }
  removeMedicine(m: MedicineModel) {
    this.selectedMedicines = this.selectedMedicines.filter(med => med.id !== m.id);
    this.prescription.medicineIds = this.prescription.medicineIds.filter(id => id !== m.id);
  }

  addTest(t: Test) {
    if (!this.selectedTests.find(test => test.id === t.id)) {
      this.selectedTests.push(t);
      this.prescription.testIds.push(t.id);
    }
  }
  onTestSelect(event: any) {
    const testId = +event.target.value; // convert string to number
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      this.addTest(test);
    }
    // reset select
    event.target.value = '';
  }
  removeTest(t: Test) {
    this.selectedTests = this.selectedTests.filter(test => test.id !== t.id);
    this.prescription.testIds = this.prescription.testIds.filter(id => id !== t.id);
  }

  // savePrescription() {
  //   console.log('Sending JSON:', JSON.stringify(this.prescription)); // <-- logs JSON

  //   this.prescriptionService.create(this.prescription).subscribe(res => {
  //     console.log('Saved:', res);
  //     this.generatePDF();
  //   });
  // }


  savePrescription() {
  // Transform prescription to backend format
  const payload = {
    note: this.prescription.note,
    advice: this.prescription.advice,
    height: this.prescription.height,
    weight: this.prescription.weight,
    bp: this.prescription.bp,
    applyWay: this.prescription.applyWay,

    doctor: { id: this.prescription.doctorId },
    appointment: { id: this.selectedAppointmentId },

    medicines: this.prescription.medicineIds.map(id => ({ id })),
    tests: this.prescription.testIds.map(id => ({ id }))
  };

  console.log('Sending JSON:', JSON.stringify(payload));

  // Correct subscribe syntax
  this.prescriptionService.create(payload).subscribe({
    next: (res) => {
      console.log('Saved:', res);
      this.generatePDF();
    },
    error: (err) => {
      console.error('Error response:', err);
    }
  });
}

  

generatePDF() {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('🏥 Health Care of Bangladesh', 105, 10, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Patient Name: ${this.prescription.patientName}`, 14, 30);
  doc.text(`Age: ${this.prescription.patientAge}`, 14, 37);
  doc.text(`Contact: ${this.prescription.patientContact}`, 14, 44);
  doc.text(
    `Doctor: ${this.doctors.find(d => d.id === this.prescription.doctorId)?.name || ''}`,
    14,
    51
  );
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 51);

  // Medicines
  const medicineRows = this.selectedMedicines.map(m => [m.medicineName, this.prescription.applyWay]);
  (doc as any).autoTable({
    startY: 60,
    head: [['Medicine', 'Apply Way']],
    body: medicineRows
  });

  // Tests
  const startY = 60 + (medicineRows.length + 1) * 10; // adjust spacing
  const testRows = this.selectedTests.map(t => [t.testName]);
  (doc as any).autoTable({
    startY,
    head: [['Tests']],
    body: testRows
  });

  // Advice
  const adviceY = startY + (testRows.length + 1) * 10;
  doc.text(`Advice: ${this.prescription.advice}`, 14, adviceY);

  doc.save(`Prescription_${this.prescription.patientName}_${Date.now()}.pdf`);
}




// generatePDF() {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text('🏥 Health Care of Bangladesh', 105, 10, { align: 'center' });
//   doc.setFontSize(12);
//   doc.text(`Patient Name: ${this.prescription.patientName}`, 14, 30);
//   doc.text(`Age: ${this.prescription.patientAge}`, 14, 37);
//   doc.text(`Contact: ${this.prescription.patientContact}`, 14, 44);
//   doc.text(`Doctor: ${this.doctors.find(d => d.id === this.prescription.doctorId)?.name || ''}`, 14, 51);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 51);

//   // Medicines
//   const medicineRows = this.selectedMedicines.map(m => [m.medicineName, this.prescription.applyWay]);
//   autoTable(doc, {
//     startY: 60,
//     head: [['Medicine', 'Apply Way']],
//     body: medicineRows
//   });

//   // Tests
//   const startY = 60 + medicineRows.length * 10 + 10;
//   const testRows = this.selectedTests.map(t => [t.testName]);
//   autoTable(doc, {
//     startY,
//     head: [['Tests']],
//     body: testRows
//   });

//   doc.text(`Advice: ${this.prescription.advice}`, 14, startY + testRows.length * 10 + 10);

//   doc.save(`Prescription_${this.prescription.patientName}_${Date.now()}.pdf`);
// }


onAppointmentChange() {
  if (this.selectedAppointmentId) {
    this.appoinmentService.getAppointmentById(this.selectedAppointmentId)
      .subscribe(appointment => {
        if (appointment) {

          console.log(appointment);
          this.prescription.patientName = appointment.patientName;
          this.prescription.patientContact = appointment.patientContact;
        } else {
          this.prescription.patientName = '';
          this.prescription.patientContact = '';
        }
      });
  }
}


}