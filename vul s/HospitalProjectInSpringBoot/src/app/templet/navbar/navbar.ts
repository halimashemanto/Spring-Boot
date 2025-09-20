import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private authService:AuthService){}


  

logout() {
    this.authService.logout();
  }


}
