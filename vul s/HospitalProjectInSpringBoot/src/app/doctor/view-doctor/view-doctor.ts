import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../AllModel/user.model';
import { UserService } from '../../Service/user-service';
import { Doctor } from '../model/doctor.model';
import { DoctorService } from '../doctor-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-doctor',
  standalone: false,
  templateUrl: './view-doctor.html',
  styleUrl: './view-doctor.css'
})
export class ViewDoctor  {
  
  doctors: Doctor[] = [];

  constructor(private http: HttpClient,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.http.get<Doctor[]>('http://localhost:8080/api/doctor/')
      .subscribe({
        next: (res) => {
          this.doctors = res;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Doctor data load error:', err);
        }
      });
  }

}
