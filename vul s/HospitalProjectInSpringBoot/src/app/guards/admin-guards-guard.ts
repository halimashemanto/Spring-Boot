import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthService } from '../Service/auth-service';
import { Observable } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'  
})




export class  AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
  ){}



   canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {

    if(this.authService.isAdmin()){

      return true;
    }

    return this.router.createUrlTree(['login']);
 
  }
}