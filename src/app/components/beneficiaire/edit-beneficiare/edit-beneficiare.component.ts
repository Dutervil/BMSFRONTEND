import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../../enum/notification-type.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../notification.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";

@Component({
  selector: 'app-edit-beneficiare',
  templateUrl: './edit-beneficiare.component.html',
  styleUrls: ['./edit-beneficiare.component.css']
})
export class EditBeneficiareComponent implements OnInit {

  beneficiare:any;
  // @ts-ignore
  profileImage:File;
  // @ts-ignore
  fileName:string
  constructor(private route: ActivatedRoute,
              private router:Router,
              private notificationService:NotificationService,
              private beneficiaireService:BeneficiaireService) { }

  ngOnInit(): void {

    let id =this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.beneficiaireService.getBeneficiaire(id).subscribe(
      response=>{
        this.beneficiare=response;
        console.log(this.beneficiare)
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

  updateBeneficiaire(beneficiaireForm: NgForm, id:number) {

    const formData=this.beneficiaireService.createUserFormData(id+"",beneficiaireForm.value,this.profileImage)
    this.beneficiaireService.updateBeneficiare(formData).subscribe(
      (response)=>{
        // @ts-ignore
        this.profileImage=null;
        // @ts-ignore
        this.fileName=null;
        this.router.navigateByUrl("BMS/beneficiaire-list")
        this.sentErrorNotification(NotificationType.SUCCESS,"Beneficiaire updated successfully");
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
    console.log(formData);
  }


  onProfileImageChange($event: Event) {
    // @ts-ignore
    this.profileImage=event.target.files[0];
    // @ts-ignore
    this.fileName=event.target.files[0].name;
  }


}
