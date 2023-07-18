import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../../enum/notification-type.enum";
import {NotificationService} from "../../../notification.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-add-beneficiare-form',
  templateUrl: './add-beneficiare-form.component.html',
  styleUrls: ['./add-beneficiare-form.component.css']
})
export class AddBeneficiareFormComponent implements OnInit {

  constructor(private notificationService:NotificationService,
              private beneService:BeneficiaireService,
              private route:Router) { }
  // @ts-ignore
  profileImage:File;
  // @ts-ignore
  fileName:string
  ngOnInit(): void {
  }

  onProfileImageChange($event: any) {
    // @ts-ignore
    this.profileImage=event.target.files[0];
    // @ts-ignore
    this.fileName=event.target.files[0].name;
  }


  addBeneficiaire(beneficiaire:NgForm) :void {

    const formData=this.beneService.createUserFormData('',beneficiaire.value,this.profileImage)
    this.beneService.saveBeneficiare(formData).subscribe(
      (response)=>{
        // @ts-ignore
        this.profileImage=null;
        // @ts-ignore
        this.fileName=null;
        this.route.navigateByUrl("BMS/beneficiaire-list")
        this.sentErrorNotification(NotificationType.SUCCESS,"Beneficiaire Created successfully");
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
