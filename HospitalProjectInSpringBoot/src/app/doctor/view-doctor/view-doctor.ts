import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../AllModel/user.model';
import { UserService } from '../../Service/user-service';
import { Doctor } from '../model/doctor.model';
import { DoctorService } from '../doctor-service';

@Component({
  selector: 'app-view-doctor',
  standalone: false,
  templateUrl: './view-doctor.html',
  styleUrl: './view-doctor.css'
})
export class ViewDoctor implements OnInit {



  doctor?: Doctor;

  constructor(private doctorService: DoctorService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.doctorService.getProfile().subscribe({
      next: (data) => {
        this.doctor = data;
        console.log(data);
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }


}
