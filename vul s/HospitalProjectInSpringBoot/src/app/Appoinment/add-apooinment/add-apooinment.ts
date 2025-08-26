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
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-apooinment',
  standalone: false,
  templateUrl: './add-apooinment.html',
  styleUrl: './add-apooinment.css'
})
export class AddApooinment {

  appoinments: any[] = [];
  doctors: any[] = [];
  scheduleSlot: any[] = [];
  departments: any[] = [];

  selectedAppoinment: number = 0;
  selectedDepartment: number = 0;
  selectedDoctor: number = 0;
  selectedScheduleSlot: number = 0;

  patientContact: string = '';
  patientName: string = '';
  reason: string = '';

  constructor(private appoinmentService: AppoinmentService,

    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.appoinmentService.getDepartments().subscribe(data => {
      this.departments = data;
      this.cdr.markForCheck();
      console.log(this.appoinments);
    });
  }

  onDepartmentChange() {

    this.doctors = [];
    this.scheduleSlot = [];
   this.selectedDepartment = +this.selectedDepartment; 
    console.log(this.selectedDepartment + "Department ")

    this.selectedDoctor = 0;
    this.selectedScheduleSlot = 0;

    if (this.selectedDepartment) {
      this.appoinmentService.getDoctorsByDepartment(this.selectedDepartment).subscribe(data => {
        this.doctors = data;
        this.cdr.markForCheck();
      });
    }
  }

  onDoctorChange() {
    this.scheduleSlot = [];

    this.selectedScheduleSlot = +this.selectedScheduleSlot;


    if (this.selectedDoctor) {
      this.appoinmentService.getScheduleSlotByDoctor(this.selectedDoctor).subscribe(data => {
        this.scheduleSlot = data;
        this.cdr.markForCheck();
      });
    }
  }

  // onScheduleSlotChange() {
  //   this.scheduleSlot = [];
  //   this.selectedScheduleSlot = 0;

  //   if (this.selectedScheduleSlot) {
  //     this.appoinmentService.getScheduleSlotByDoctor(this.selectedScheduleSlot).subscribe(data => {
  //       this.scheduleSlot = data;
  //       this.cdr.markForCheck();
  //     });
  //   }
  // }

  saveAppoinmrnt() {
    const appoinment = {
      patientName: this.patientName,
      patientContact: this.patientContact,
      reason: this.reason,
      departments: { id: this.selectedDepartment },
      doctors: { id: this.selectedDoctor },
      scheduleSlot: { id: this.selectedScheduleSlot }
    };

    this.appoinmentService.saveAppoinment(appoinment).subscribe(() => {
      this.cdr.markForCheck();
      alert('Appointment saved successfully!');
    });
  }
}



