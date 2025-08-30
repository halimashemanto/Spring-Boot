import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Doctor } from '../../doctor/model/doctor.model';
import { DoctorService } from '../../doctor/doctor-service';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-doctor-indivisual-profile',
  standalone: false,
  templateUrl: './doctor-indivisual-profile.html',
  styleUrl: './doctor-indivisual-profile.css'
})
export class DoctorIndivisualProfile implements OnInit {


doctor!:Doctor;
  profile: Doctor | null = null;

constructor(
  private doctorService: DoctorService,
  private cdr: ChangeDetectorRef,
  private authService:AuthService
){}
  ngOnInit(): void {

    this.loadProfile();
    
  }

    loadProfile(): void {
    this.doctorService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);        
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

 
  // encodeURL(fileName: string): string {
  //   return encodeURIComponent(fileName);
  // }


  logout() {
    this.authService.logout();
  }




}
