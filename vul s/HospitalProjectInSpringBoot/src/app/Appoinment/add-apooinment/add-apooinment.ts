import { ChangeDetectorRef, Component } from '@angular/core';
import { Appointment } from '../model/appoinment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppoinmentService } from '../appoinment-service';
import { Doctor } from '../../doctor/model/doctor.model';
import { ScheduleSlotModel } from '../model/scheduleSlotModel.model';
import { DepartmentModel } from '../../department/model/departmentModel.model';
import { ScheduleSlotService } from '../schedule-slot-service';
import { DoctorService } from '../../doctor/doctor-service';
import { DepartmentService } from '../../department/department-service';

@Component({
  selector: 'app-add-apooinment',
  standalone: false,
  templateUrl: './add-apooinment.html',
  styleUrl: './add-apooinment.css'
})
export class AddApooinment {

  appointmentForm: FormGroup;

  departments: DepartmentModel[] = [];
  doctors: Doctor[] = [];
  slots: ScheduleSlotModel[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private doctorService: DoctorService,
    private slotService: ScheduleSlotService,
    private appointmentService: AppoinmentService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: [''],
      patientContact: [''],
      reason: [''],
      doctor: [null],
      department: [null],
      scheduleSlot: [null]
    });

  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: (data) => this.departments = data,
      error: (err) => console.error(err)
    });
  }

  loadDoctors(): void {
    const departmentId = this.appointmentForm.value.departmentId;
    this.doctorService.getDoctorsByDepartment(departmentId).subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error(err)
    });
  }

  loadSlots(): void {
    
    const doctorId = this.appointmentForm.value.doctorId;
    this.slotService.getAllSlots().subscribe({
      next: (data) => this.slots = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      alert('Fill all fields.');
      return;
    }

    const appt: Appointment = {
      department: this.appointmentForm.value.department,
      doctor: this.appointmentForm.value.doctor,
      scheduleSlot: this.appointmentForm.value.scheduleSlot,
      patientName: this.appointmentForm.value.patientName,
      patientContact: this.appointmentForm.value.patientContact,
      reason: this.appointmentForm.value.reason
    };

    this.appointmentService.bookAppointment(appt).subscribe({
      next: () => {

        const selectedSlot = this.slots.find(s => s.id === appt.id);
        if (selectedSlot) {
          selectedSlot.booked = true;

        }
        alert('Appointment booked successfully!');
        this.appointmentForm.reset();
        this.slots = [];
        this.doctors = [];
      },
      error: (err) => console.error(err)
    });
  }
}



