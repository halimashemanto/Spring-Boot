import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize } from 'rxjs';
import { OfficeStaffDTO } from '../model/officestaffDTO.model';
import { AuthService } from '../../Service/auth-service';
import { OfficeStaffService } from '../../officeStaff/office-staff-service';

@Component({
  selector: 'app-office-staff-indivisual-profile',
  standalone: false,
  templateUrl: './office-staff-indivisual-profile.html',
  styleUrl: './office-staff-indivisual-profile.css'
})
export class OfficeStaffIndivisualProfile {



 profile: OfficeStaffDTO | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private officestaffService: OfficeStaffService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.officestaffService.profile$.subscribe({
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
  }

  private loadProfileFromServer() {
    this.loading = true;
    this.officestaffService.loadProfile()
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




  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'specialist': return '#4caf50';
      case 'general physician': return '#ff9800';
      case 'consultant': return '#2196f3';
      default: return '#9e9e9e';
    }

  }

}
