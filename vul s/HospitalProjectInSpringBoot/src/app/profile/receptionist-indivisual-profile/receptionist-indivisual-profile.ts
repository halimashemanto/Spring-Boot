import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize } from 'rxjs';
import { ReceptionistService } from '../../receptionist/receptionist-service';
import { AuthService } from '../../Service/auth-service';
import { ReceptionistDTO } from '../model/receptionistDTO.model';

@Component({
  selector: 'app-receptionist-indivisual-profile',
  standalone: false,
  templateUrl: './receptionist-indivisual-profile.html',
  styleUrl: './receptionist-indivisual-profile.css'
})
export class ReceptionistIndivisualProfile {


  profile: ReceptionistDTO | null = null;
  loading: boolean = true;
  errorMessage: string = '';



  constructor(private recService: ReceptionistService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.recService.profile$.subscribe({
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
    this.recService.loadProfile()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: profile => this.profile = profile,
        error: err => {
          console.error(err);
          this.errorMessage = 'Failed to load profile from server';
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


  logout() {
    this.authService.logout();
  }



}
