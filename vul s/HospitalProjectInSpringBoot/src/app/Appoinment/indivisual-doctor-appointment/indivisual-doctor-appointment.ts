import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/appoinment.model';
import { AppoinmentService } from '../appoinment-service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-indivisual-doctor-appointment',
  standalone: false,
  templateUrl: './indivisual-doctor-appointment.html',
  styleUrl: './indivisual-doctor-appointment.css'
})
export class IndivisualDoctorAppointment implements OnInit {


  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  doctors: { id: number, name: string }[] = [];
  selectedDoctorId: number | null = null;
  selectedDate: string = '';

  constructor(private appointmentService: AppoinmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: data => {
        this.appointments = data;
        this.filteredAppointments = data;

        // build doctor list
        this.doctors = Array.from(
          new Map(
            data.map(a => [a.doctorId, { id: a.doctorId, name: a.doctorName }])
          ).values()
        );
      },
      error: err => console.error("Error loading appointments", err)
    });
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(a => {
      const matchesDoctor = this.selectedDoctorId ? a.doctorId === this.selectedDoctorId : true;
      const matchesDate = this.selectedDate
        ? (a.slotDate?.substring(0, 10) === this.selectedDate)
        : true;
      return matchesDoctor && matchesDate;
    });
    // ✅ force refresh of filtered data (important for PDF export)
    this.filteredAppointments = [...this.filteredAppointments];
  }

  clearFilters() {
    this.selectedDoctorId = null;
    this.selectedDate = '';
    this.filteredAppointments = [...this.appointments];
  }

 exportToPDF() {
  if (!this.filteredAppointments.length) {
    alert("No appointments to export!");
    return;
  }

  const doc = new jsPDF();

  const doctorName = this.selectedDoctorId
    ? this.doctors.find(d => d.id === this.selectedDoctorId)?.name
    : 'All Doctors';

  // ensure doctorName is a string before calling replace
  const safeDoctorName = (doctorName || 'All_Doctors').replace(/\s+/g, '_');
  const dateText = this.selectedDate ? ` on ${this.selectedDate}` : '';
  const title = `Appointments of ${doctorName}${dateText}`;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(title, 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [['Patient', 'Contact', 'Reason', 'Department', 'Doctor', 'Slot Date', 'Slot Time']],
    body: this.filteredAppointments.map(a => [
      a.patientName || '-',
      a.patientContact || '-',
      a.reason || '-',
      a.departmentName || '-',
      a.doctorName || '-',
      a.slotDate ? a.slotDate.substring(0, 10) : '-',
      `${a.slotStartTime || '-'} - ${a.slotEndTime || '-'}`
    ]),
    styles: { fontSize: 10 }
  });

  const fileName = `appointments_${safeDoctorName}${this.selectedDate ? '_' + this.selectedDate : ''}.pdf`;
  doc.save(fileName);
}

}