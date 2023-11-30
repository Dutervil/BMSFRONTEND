import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../notification.service";
import {UserService} from "../../../service/user.service";
import {NotificationType} from "../../../enum/notification-type.enum";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any;
  // @ts-ignore
  profileImage:File;
  // @ts-ignore
  fileName:string
  constructor(private route: ActivatedRoute,
              private router:Router,
              private notificationService:NotificationService,
              private userService:UserService) { }

  ngOnInit(): void {
    let id =this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.userService.findById(id).subscribe(
      response=>{
        this.user=response;
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
  }

  onProfileImageChange(event:any) {
    this.profileImage=event.target.files[0];
    this.fileName=event.target.files[0].name;
  }

  updateUser(UserForm: NgForm,id:any,username:string) {
    const formData=this.userService.createUserFormData(
      username,UserForm.value,id,this.profileImage
    )
    console.log('isNotLocked', UserForm.value.isNotLocked);
    console.log('isActive', UserForm.value.isActive);
    console.log("Form Data ",formData)
    this.userService.UpdateUser(formData).subscribe(
      (response)=>{
        // @ts-ignore
        this.profileImage=null;
        // @ts-ignore
        this.fileName=null;
        this.router.navigateByUrl("BMS/user/list")
        this.sentErrorNotification(NotificationType.SUCCESS,"Modification resussite");
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
    console.log(formData);
  }

  sentErrorNotification(error: NotificationType, message: string) {

    if (message){
      this.notificationService.notify(error,message)
    }else{
      this.notificationService.notify(error,"AN ERROR OCCURED. PLEASE TRY AGAIN")
    }
  }
}
