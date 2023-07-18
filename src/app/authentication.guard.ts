import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./service/authentication.service";
import {NotificationService} from "./notification.service";
import {NotificationType} from "./enum/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor( private authService:AuthenticationService,private route:Router,private notificationService:NotificationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }

  // @ts-ignore
  private isUserLoggedIn() : boolean{
    if (this.authService.isLoggedIn()){
      return true;
    }
    this.route.navigate(['/login'])
    this.notificationService.notify(NotificationType.ERROR,"You need to log in to access this page".toUpperCase() )
    return false;
  }
}
