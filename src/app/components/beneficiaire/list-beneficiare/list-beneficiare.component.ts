import { Component, OnInit } from '@angular/core';
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {NotificationService} from "../../../notification.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {Router} from "@angular/router";
import {Beneficiaire} from "../../../model/Beneficiaire";

@Component({
  selector: 'app-list-beneficiare',
  templateUrl: './list-beneficiare.component.html',
  styleUrls: ['./list-beneficiare.component.css']

})
export class ListBeneficiareComponent implements OnInit {

  constructor(private beneficiaireService:BeneficiaireService,
             private notificationService:NotificationService,
              private router:Router) { }
  public filterText: string = '';
  public beneficiaire: Beneficiaire[] = []; // Assuming you have a Beneficiaire interface/type
  public filteredBeneficiaire: Beneficiaire[] = [];
  ngOnInit(): void {
    this.getBeneficiaire(true);
  }

  public getBeneficiaire(showNotification: boolean) {
    this.beneficiaireService.listBeneficiaire().subscribe(
      response => {
        console.log(response);
        this.beneficiaire = response;
        this.filteredBeneficiaire = this.beneficiaire; // Initialize filteredBeneficiaire with all beneficiaries
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

  view(id:number) {
    this.router.navigateByUrl(`BMS/beneficiaire-view/${id}`)
  }

  delete(id:number) {
    if (confirm("Es-tu d'accord")){
      this.beneficiaireService.deleteBeneficiaire(id).subscribe(
        response=>{
          this.sentErrorNotification(NotificationType.ERROR, "Suppression reussite")

        },
        error => {
          this.sentErrorNotification(NotificationType.ERROR, error.error.message)

        }
      )
    }
  }

  filterUsers() {

      if (this.filterText.trim() === '') {
        // If filter input is empty, show all beneficiaries
        this.filteredBeneficiaire = this.beneficiaire;
      } else {
        // Filter beneficiaries based on the input value
        this.filteredBeneficiaire = this.beneficiaire.filter(beneficiary =>
          beneficiary.nom.toLowerCase().includes(this.filterText.toLowerCase())
        );
      }
    }

}
