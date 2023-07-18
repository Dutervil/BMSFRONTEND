import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {NotificationService} from "../../../notification.service";
import {UserService} from "../../../service/user.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {NotificationType} from "../../../enum/notification-type.enum";

@Component({
  selector: 'app-view-beneficiare',
  templateUrl: './view-beneficiare.component.html',
  styleUrls: ['./view-beneficiare.component.css']
})
export class ViewBeneficiareComponent implements OnInit {

  beneficiare:any;
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

  openEdit(id:number) {
    this.router.navigateByUrl(`BMS/beneficiaire-edit/${id}`)
  }
}
