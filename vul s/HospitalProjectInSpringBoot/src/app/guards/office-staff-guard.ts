import { CanActivateFn } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'  
})



export class OfficeStaffGuard  implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
  ){}



   canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {

    if(this.authService.isOfficeStaff()){

      return true;
    }

    return this.router.createUrlTree(['login']);
 
  }
}

