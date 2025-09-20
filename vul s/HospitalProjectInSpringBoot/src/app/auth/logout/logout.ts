import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{

  constructor(

    private authService: AuthService


  ){}

  ngOnInit(): void {
    
    this.logout();
  }


  logout():void{

    this.authService.logout();
  }

}
