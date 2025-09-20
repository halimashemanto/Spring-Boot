import { ChangeDetectorRef, Component } from '@angular/core';
import { NurseService } from '../../nurse/nurse-service';
import { AuthService } from '../../Service/auth-service';
import { NurseDTO } from '../model/nurseDTO.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-nurse-indivisual-profile',
  standalone: false,
  templateUrl: './nurse-indivisual-profile.html',
  styleUrl: './nurse-indivisual-profile.css'
})
export class NurseIndivisualProfile {


  profile: NurseDTO | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private nurseService: NurseService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.nurseService.profile$.subscribe({
      next: profile => {
        if (profile) {
          this.profile = profile;
          this.cd.markForCheck();
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

    this.LoadProfile();
  }

  private loadProfileFromServer() {
    this.loading = true;
    this.nurseService.loadProfile()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: profile => this.profile = profile,
        error: err => {
          console.error(err);
          this.errorMessage = 'Failed to load profile from server';
        }
      });
  }

  
  logout() {
    this.authService.logout();
  }


  LoadProfile(){

    this.nurseService.getProfile().subscribe({      
        next: (res) => {
          this.profile = res;
          console.log('Profile loaded:', res);         
          this.cd.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load profile:', err);
        }     

    });
  }




  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'specialist': return '#4caf50';
      case 'general physician': return '#ff9800';
      case 'consultant': return '#2196f3';
      default: return '#9e9e9e';
    }

  }
}