import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './Service/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'HospitalProjectInSpringBoot';

   loginStatus$: Observable<string | null>;

  constructor(public authService: AuthService) {
    // now BehaviorSubject is already initialized from localStorage
    this.loginStatus$ = this.authService.userRole$;
  }

  
 

}
