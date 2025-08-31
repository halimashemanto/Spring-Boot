import { ChangeDetectorRef, Component } from '@angular/core';
import { AppoinmentService } from '../../Appoinment/appoinment-service';

@Component({
  selector: 'app-public-nav',
  standalone: false,
  templateUrl: './public-nav.html',
  styleUrl: './public-nav.css'
})
export class PublicNav {

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

  


saveAppoinmrnt() {
  const appointment = {
    patientName: this.patientName,
    patientContact: this.patientContact,
    reason: this.reason,
    department: { id: this.selectedDepartment },
    doctor: { id: this.selectedDoctor },
    scheduleSlot: { id: this.selectedScheduleSlot }
  };

  this.appoinmentService.saveAppoinment(appointment).subscribe({
    next: () => {
      alert('✅ Appointment saved successfully!');

      // Form reset
      this.patientName = '';
      this.patientContact = '';
      this.reason = '';
      this.selectedDepartment = 0;
      this.selectedDoctor = 0;
      this.selectedScheduleSlot = 0;

      // Clear doctor & schedule arrays
      this.doctors = [];
      this.scheduleSlot = [];

      
      this.cdr.markForCheck();
    },
    error: err => {
      console.error("❌ Appointment save error:", err);
      alert('Failed to save appointment!');
    }
  });
}


onFocus(event: any) {
  event.target.style.borderColor = '#0ea5e9';
  event.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.25)';
}

onBlur(event: any) {
  event.target.style.borderColor = '#ccc';
  event.target.style.boxShadow = 'none';
}


}
