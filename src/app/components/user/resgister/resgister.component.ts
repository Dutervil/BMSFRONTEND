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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const progress_bar_container=document.querySelector('.progress-bar-container');
      const fileInput = document.getElementById('fileInput');
      const progressBar = document.querySelector('.progress-bar');
      const previewImage = document.getElementById('previewImage');
      reader.addEventListener('load', (e) => {
        // @ts-ignore
        const percentage = (e.loaded / e.total) * 100;
        // @ts-ignore
        progress_bar_container.style.display = 'block';
        // @ts-ignore
        progressBar.style.width = percentage + '%';
        // @ts-ignore
        previewImage.setAttribute('src', e.target.result);
        // @ts-ignore
        previewImage.style.display = 'block';
      });

      reader.readAsDataURL(file);
    }
  }

  addNewUser(userForm:NgForm) :void {
   const formData=this.userService.createUserFormData(
      '',userForm.value,'',this.profileImage
   )
    console.log("Form Data ",formData)
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
