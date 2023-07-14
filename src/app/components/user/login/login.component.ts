import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {NotificationService} from "../../../notification.service";
import {User} from "../../../model/User";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../../enum/notification-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
   showLogin: boolean=false;
  private subscription:Subscription[]=[];

  constructor(private router:Router,
              private authService: AuthenticationService,
              private notificationService:NotificationService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.router.navigateByUrl("/BMS")
    }else{
      this.router.navigateByUrl("/login")
    }
  }

  public onLogin(user: User){
    this.showLogin=true;
     this.authService.login(user).subscribe(
       (response)=>{

         console.log("TOKEN:  "+JSON.stringify(response.body.token))
         console.log("body:  "+JSON.stringify(response.body.user))
         this.authService.saveToken(JSON.stringify(response.body.token))
         this.authService.addUserToLocalCache(response.body.user)
         this.router.navigateByUrl("/BMS");
         this.showLogin=false;
       },
       (error: any)=>{
        console.log(error.message)
         this.sentErrorNotification(NotificationType.ERROR,error?.error.message)
         this.showLogin=false
       }
     )


    console.log(user)
  }

  sentErrorNotification(error: NotificationType, message: string) {

       if (message){
         this.notificationService.notify(error,message)
       }else{
         this.notificationService.notify(error,"AN ERROR OCCURED. PLEASE TRY AGAIN")
       }
    }
  ngOnDestroy():void{
     this.subscription.forEach(sub=> sub.unsubscribe())
  }
}
