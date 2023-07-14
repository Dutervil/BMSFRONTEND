import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationType} from "../../../enum/notification-type.enum";
import {NotificationService} from "../../../notification.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private notificationService:NotificationService,
  private userService:UserService) { }
  user:any
  permissions:any=[];
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    let username =this.route.snapshot.paramMap.get("username")
    // @ts-ignore
    this.userService.findUser(username).subscribe(
      response=>{
        this.user=response;
       console.log(this.user)
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
  }
  sentErrorNotification(error: NotificationType, message: string) {

    if (message){
      this.notificationService.notify(error,message)
    }else{
      this.notificationService.notify(error,"AN ERROR OCCURED. PLEASE TRY AGAIN")
    }
  }

  onUpdateProfile(profileUserForm: NgForm) {

  }
}
