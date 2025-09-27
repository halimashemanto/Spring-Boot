import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {


  userRole: string | null = null;
  isLoggedIn: boolean = false;

  constructor(

    private authService: AuthService


  ) { }
  ngOnInit(): void {

    this.userRole = this.authService.getUserRole();
    this.isLoggedIn = this.authService.isLoggIn();


    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });

  }


  isDoctor(): boolean {
    return this.authService.isDoctor();
  }

  isNurse(): boolean {
    return this.authService.isNurse();
  }

  isReceptionist(): boolean {
    return this.authService.isReceptionist();
  }

  isOfficeStaff(): boolean {
    return this.authService.isOfficeStaff();
  }

 isAdmin(): boolean {
    return this.authService.isAdmin();
  }

 

}
