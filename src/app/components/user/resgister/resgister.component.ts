import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {NotificationService} from "../../../notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {

  constructor(private userService:UserService,
              private router:Router,
              private notificationService:NotificationService) { }
   // @ts-ignore
  profileImage:File;
  // @ts-ignore
  fileName:string
  ngOnInit(): void {
  }

  onLogin(value: any) {

  }

  onSubmit(f: NgForm) {

  }

  public onProfileImageChange(event: any): void{
   this.profileImage=event.target.files[0];
   this.fileName=event.target.files[0].name;
  }

  addNewUser(userForm:NgForm) :void {
   const formData=this.userService.createUserFormData(
      '',userForm.value,this.profileImage
   )
    this.userService.addUser(formData).subscribe(
      (response)=>{
        // @ts-ignore
        this.profileImage=null;
        // @ts-ignore
        this.fileName=null;
        this.router.navigateByUrl("BMS/user/list")
        this.sentErrorNotification(NotificationType.SUCCESS,"User Created successfully");
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
