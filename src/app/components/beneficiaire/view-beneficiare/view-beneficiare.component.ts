import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {NotificationService} from "../../../notification.service";
import {UserService} from "../../../service/user.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {DepenceService} from "../../../service/depence.service";
import {MatDialog} from "@angular/material/dialog";
import {ViewAndPrintComponent} from "../view-and-print/view-and-print.component";
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-view-beneficiare',
  templateUrl: './view-beneficiare.component.html',
  styleUrls: ['./view-beneficiare.component.css']
})
export class ViewBeneficiareComponent implements OnInit {

  beneficiare:any;
  depence:any=[]
  amounts:any=[];
  total:any;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private depenceService:DepenceService,
              private matDialog:MatDialog,
              private notificationService:NotificationService,
              private beneficiaireService:BeneficiaireService) { }

  ngOnInit(): void {
    let id =this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.beneficiaireService.getBeneficiaire(id).subscribe(
      response=>{
        this.beneficiare=response;
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
    this.getExpences();
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

  getExpences(){
    let id =this.route.snapshot.paramMap.get("id");
     this.depenceService.getDepencesByBeneficiaireId(id).subscribe(
       response=>{
         this.depence=response;
         response.map((e:any)=>{
           this.amounts.push(e.montant)
         })
        this.total =  this.amounts.reduce((accumulator: number, input: number): number => accumulator + input);
        console.log(this.total);

       },error => {
         console.log(error)
       }
     )
  }

  openReport() {
    let id =this.route.snapshot.paramMap.get("id")
    this.router.navigateByUrl(`BMS/expences/report/${id}`)
  }
}
