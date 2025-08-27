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

  constructor(
    private appoinmentService: AppoinmentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appoinmentService.getAppointments().subscribe({
      next: data => {
        this.appointments = data;
        this.cdr.markForCheck();
      },
      error: err => console.error("Error loading appointments", err)
    });
  }

}
