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
export class ViewDoctor  {


       doctor: Doctor[] = [];


  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {

    this.loadDoctors();
  }


 
 
  loadDoctors(): void {
    this.doctorService.getAllDoctor().subscribe({
      next: (data) => {
        console.log("User data loaded:", data); 
        this.doctor = data;
      },
      error: (err) => {
        console.error("Error fetching users", err);
      }
    });
  }


}
