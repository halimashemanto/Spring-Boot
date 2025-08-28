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

  constructor(private appointmentService: AppoinmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: data => {
        this.appointments = data;
        this.filteredAppointments = data;

        
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
    if (this.selectedDoctorId) {
      this.filteredAppointments = this.appointments.filter(
        a => a.doctorId === this.selectedDoctorId
      );
    } else {
      this.filteredAppointments = this.appointments;
    }
  }

  exportToPDF() {
    const doc = new jsPDF();
    const title = this.selectedDoctorId
      ? `Appointments of Doctor: ${this.doctors.find(d => d.id === this.selectedDoctorId)?.name}`
      : 'All Appointments';

    doc.text(title, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Patient', 'Contact', 'Reason', 'Department', 'Doctor', 'Slot']],
      body: this.filteredAppointments.map(a => [
        a.patientName,
        a.patientContact || '-',
        a.reason || '-',
        a.departmentName,
        a.doctorName,
        `${a.slotDate?.substring(0, 10)} (${a.slotStartTime} - ${a.slotEndTime})`
      ]),
      styles: { fontSize: 10 }
    });

    doc.save('appointments.pdf');
  }
}