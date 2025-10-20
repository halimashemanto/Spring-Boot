import { ChangeDetectorRef, Component } from '@angular/core';
import { AppoinmentService } from '../appoinment-service';
import { Appointment } from '../model/appoinment.model';

@Component({
  selector: 'app-view-all-appointment',
  standalone: false,
  templateUrl: './view-all-appointment.html',
  styleUrl: './view-all-appointment.css'
})
export class ViewAllAppointment {

   appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  doctorNames: string[] = [];

  selectedDate: string = '';
  selectedDoctor: string = '';

  constructor(
    private appoinmentService: AppoinmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appoinmentService.getAppointments().subscribe({
      next: data => {
        this.appointments = data;
        this.filteredAppointments = data;

        // unique doctor list
        this.doctorNames = [...new Set(data.map(a => a.doctorName))];

        this.cdr.markForCheck();
      },
      error: err => console.error('Error loading appointments', err)
    });
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(a => {
      const matchesDoctor = this.selectedDoctor ? a.doctorName === this.selectedDoctor : true;
      const matchesDate = this.selectedDate
        ? a.slotDate?.substring(0, 10) === this.selectedDate
        : true;
      return matchesDoctor && matchesDate;
    });
    this.filteredAppointments = [...this.filteredAppointments];
  }

  clearFilters() {
    this.selectedDoctor = '';
    this.selectedDate = '';
    this.filteredAppointments = [...this.appointments];
  }

  // exportToPDF() {
  //   if (!this.filteredAppointments.length) {
  //     alert('No appointments to export!');
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   const doctorName = this.selectedDoctor || 'All Doctors';
  //   const safeDoctorName = (doctorName || 'All_Doctors').replace(/\s+/g, '_');
  //   const dateText = this.selectedDate ? ` on ${this.selectedDate}` : '';
  //   const title = `Appointments of ${doctorName}${dateText}`;

  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(14);
  //   doc.text(title, 14, 15);

  //   autoTable(doc, {
  //     startY: 25,
  //     head: [['Patient', 'Contact', 'Reason', 'Department', 'Doctor', 'Slot Date', 'Slot Time']],
  //     body: this.filteredAppointments.map(a => [
  //       a.patientName || '-',
  //       a.patientContact || '-',
  //       a.reason || '-',
  //       a.departmentName || '-',
  //       a.doctorName || '-',
  //       a.slotDate ? a.slotDate.substring(0, 10) : '-',
  //       `${a.slotStartTime || '-'} - ${a.slotEndTime || '-'}`
  //     ]),
  //     styles: { fontSize: 10 }
  //   });

  //   const fileName = `appointments_${safeDoctorName}${this.selectedDate ? '_' + this.selectedDate : ''}.pdf`;
  //   doc.save(fileName);
  // }

}
