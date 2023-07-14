import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../notification.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users:any ;
  constructor(private notificationService:NotificationService,
    private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers(true)
  }
  openEditUrl(){

  }

  public getUsers(showNotification: boolean){
    this.userService.getUsers().subscribe(
      response=>{
        console.log(response)
        this.users=response;
        if (showNotification){
          if (this.users.length>0){
            this.sentErrorNotification(NotificationType.SUCCESS, `${this.users.length} Utilisateur(s) trouve(s)`)
          }else{
            this.sentErrorNotification(NotificationType.INFO, `La liste est vide`)
          }
        }
      },error => {
       this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    );


  }
  sentErrorNotification(error: NotificationType, message: string) {

    if (message){
      this.notificationService.notify(error,message)
    }else{
      this.notificationService.notify(error,"AN ERROR OCCURED. PLEASE TRY AGAIN")
    }
  }

  view(username: string ) {
    this.router.navigateByUrl(`BMS/user/view/${username}`)
}

  edit(id: string ) {
    this.router.navigateByUrl(`BMS/user/edit/${id}`)
  }
}
