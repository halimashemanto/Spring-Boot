import { ChangeDetectorRef, Component } from '@angular/core';
import { AdmiProfileService } from '../admi-profile-service';
import { User } from '../../AllModel/user.model';
import { AuthService } from '../../Service/auth-service';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-admi-profile',
  standalone: false,
  templateUrl: './admi-profile.html',
  styleUrl: './admi-profile.css'
})
export class AdmiProfile {


  profile: User | null = null;
  loading = true;
  errorMsg = '';

  constructor(
    private admiService: AdmiProfileService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const cached = this.admiService.getCachedProfile();
    if (cached) {
      this.profile = cached;
      this.loading = false;
    } else {
      this.loadProfile();
    }

    this.admiService.profile$.subscribe(profile => {
      if (profile) {
        this.profile = profile;
        this.cd.markForCheck();
      }
    });
  }

  loadProfile() {
    this.loading = true;
    this.admiService.loadProfile()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: profile => {
          this.profile = profile;
          if (localStorage) localStorage.setItem('admi', JSON.stringify(profile));
        },
        error: err => {
          console.error(err);
          this.errorMsg = 'Failed to load profile';
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
isAdmin(): boolean {
  return this.authService.isAdmin();

}}
