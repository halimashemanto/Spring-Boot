import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'HospitalProjectInSpringBoot';

  //  showSidebar = true;
  
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       const hcbRoutes = event.url.startsWith('/punblicNav/') || event.url.startsWith('/medicine/**') || event.url.startsWith('/PublicNav/');
  //       this.showSidebar = hcbRoutes;
  //     }
  //   });
  // }
}
