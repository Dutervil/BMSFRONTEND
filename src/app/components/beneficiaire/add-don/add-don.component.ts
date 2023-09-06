import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {NotificationService} from "../../../notification.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {Router} from "@angular/router";
import {DepenceService} from "../../../service/depence.service";
import {Beneficiaire} from "../../../model/Beneficiaire";
import {NotificationType} from "../../../enum/notification-type.enum";


@Component({
  selector: 'app-add-don',
  templateUrl: './add-don.component.html',
  styleUrls: ['./add-don.component.css']
})
export class AddDonComponent implements OnInit {

  public beneficiaire: Beneficiaire[] = []

  // @ts-ignore
  expenseForm: FormGroup;
  public  depence:any=[]
  typeDepences:any=["Scolaire","Payroll","Medical","Logement","Autre"
  ]
  currencies:any=["USD","HTG"];
  expencesType:any=["Moncash","Banque ou Cheque"];
  selectedType: any;
  beneficiaireId:any;
  showMoncash:any=false;
   showBank:any=false;
  beneficiare:any;
  numeroCompte:string = '';
  numeroMoncash:string = '';
  constructor(private notificationService:NotificationService,
              private beneService:BeneficiaireService,
              private depenceService:DepenceService,
              private fb: FormBuilder,
              private route:Router) { }

  ngOnInit(): void {
    this.getBeneficiares(true);
    this.createForm();
  }

  saveDepence() {
   console.table(this.expenseForm.value)
    this.depenceService.saveDepence(this.expenseForm.value).subscribe(
      (response)=>{
        this.route.navigateByUrl("BMS/beneficiaire-list")
        this.sentErrorNotification(NotificationType.SUCCESS,"Paiment Ajoute avec succes");
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error?.message)
      }
    )
  }

  getBeneficiares(showNotification: boolean){
    this.beneService.listBeneficiaire().subscribe(
      response => {
        console.log(response);
        this.beneficiaire = response;

        if (showNotification) {
          if (this.beneficiaire.length > 0) {
            this.sentErrorNotification(NotificationType.SUCCESS, `${this.beneficiaire.length} beneficiaire(s) trouve(s)`);
          } else {
            this.sentErrorNotification(NotificationType.INFO, `La liste est vide`);
          }
        }
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message);
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

  expencesTypeCheck(event:Event) {
    // @ts-ignore
    var value=event.target.value as HTMLInputElement;
   // @ts-ignore
    if(value=='Moncash'){
     this.showMoncash=true;
     this.showBank=false;
   }else{
     this.showMoncash=false;
     this.showBank=true;
   }
  }

  getBeneficiaryInfo() {
    this.beneService.getBeneficiaire(this.beneficiaireId).subscribe(
      response=>{
        this.beneficiare=response;
        this.numeroCompte=this.beneficiare?.numeroCompte;
        this.numeroMoncash=this.beneficiare?.moncashNumber;
        // @ts-ignore
        this.expenseForm.get('accountNumber').setValue(this.numeroCompte);
        // @ts-ignore
        this.expenseForm.get('moncashNumber').setValue(this.numeroMoncash);

        this.depence=this.beneficiare?.depences;
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message)
      }
    )
  }

  createForm(){
    this.expenseForm = this.fb.group({
      typeDepence: [''],
      montant: [0],
      dateDepence: [''],
      description: [''],
      accountNumber: [''],
      moncashNumber: [''],
      numeroCheque: [''],
      nomCheque: [''],
      uniteMonetaire: [''],
      versement: [''],
      beneficiareId: [0]
    });
  }
}

