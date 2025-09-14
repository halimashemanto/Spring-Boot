import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Doctor } from '../../doctor/model/doctor.model';
import { DoctorService } from '../../doctor/doctor-service';
import { AuthService } from '../../Service/auth-service';
import { DoctorDTO } from '../model/doctorInduvisualProfile.model';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-doctor-indivisual-profile',
  standalone: false,
  templateUrl: './doctor-indivisual-profile.html',
  styleUrl: './doctor-indivisual-profile.css'
})
export class DoctorIndivisualProfile implements OnInit {


  constructor(private doctorService: DoctorService,
    private authService: AuthService
  ) {}

 


 profile: DoctorDTO | null = null;
  loading: boolean = true;
  errorMessage: string = '';


//  ngOnInit(): void {
//   const cached = this.doctorService.getCachedProfile();
//   if (cached) {
//     this.profile = cached;
//     this.loading = false;
//   } else {
//     this.loadProfileFromServer();
//   }

//   // Always subscribe to BehaviorSubject for updates
//   this.doctorService.profile$.subscribe(profile => {
//     if (profile) this.profile = profile;
//   });
// }


//   private loadProfileFromServer() {
//     this.loading = true;
//     this.doctorService.loadProfile()
//       .pipe(finalize(() => this.loading = false))
//       .subscribe({
//         next: profile => this.profile = profile,
//         error: err => {
//           console.error(err);
//           this.errorMessage = 'Failed to load profile from server';
//         }
//       });
//   }

















ngOnInit(): void {
  this.doctorService.profile$.subscribe({
    next: profile => {
      if (profile) {
        this.profile = profile;
        this.loading = false;
      } else {
        this.loadProfileFromServer();
      }
    },
    error: err => {
      console.error(err);
      this.errorMessage = 'Failed to load profile';
      this.loading = false;
    }
  });
}

private loadProfileFromServer() {
  this.loading = true;
  this.doctorService.loadProfile()
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: profile => this.profile = profile,
      error: err => {
        console.error(err);
        this.errorMessage = 'Failed to load profile from server';
      }
    });
}






// Component class এর ভিতর
getStatusColor(status: string): string {
  switch(status.toLowerCase()) {
    case 'specialist': return '#4caf50';   // green
    case 'general physician': return '#ff9800'; // orange
    case 'consultant': return '#2196f3';   // blue
    default: return '#9e9e9e';             // gray
  }
}












  logout() {
    this.authService.logout();
  }




}
