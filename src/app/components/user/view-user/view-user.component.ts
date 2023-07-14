import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private notificationService:NotificationService,
              private userService:UserService) { }

  user: any;
  permissions:any=[];
  ngOnInit(): void {
    let username =this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.userService.findUser(username).subscribe(
      response=>{
        this.user=response;
        this.permissions=this.user.authorities
        console.log(this.permissions)
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
}
