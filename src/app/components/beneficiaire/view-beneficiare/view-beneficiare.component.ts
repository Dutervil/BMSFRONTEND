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
  filteredExpenses:any=[];
  total:any;
  filterTypeDepence = '';
  filterCurrency = 'HTG';
  startDate = '';
  endDate = '';

  constructor(private route: ActivatedRoute,
              private router:Router,
              private depenceService:DepenceService,
              private matDialog:MatDialog,
              private notificationService:NotificationService,
              private beneficiaireService:BeneficiaireService) { }

  ngOnInit(): void {
    this.filteredExpenses = this.depence;
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
         this.filteredExpenses=response;
         this.filteredExpenses = this.filteredExpenses.filter((expense: { uniteMonetaire: string; }) => expense.uniteMonetaire === 'HTG');
         this.depence=response;
         console.log("TOTAL DEPENCES",response)
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
  parseInputDate(dateString: string): string {
    // Parse input date in 'YYYY-MM-DD' format to match the server's date format
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return parts[0] + '-' + parts[1] + '-' + parts[2];
    }
    return '';
  }
  applyFilters() {
    const parsedStartDate = this.parseInputDate(this.startDate);
    const parsedEndDate = this.parseInputDate(this.endDate);

    this.filteredExpenses = this.depence.filter((expense: { typeDepence: string; }) => {
      return this.filterTypeDepence === '' || expense.typeDepence === this.filterTypeDepence;
    });
    if (this.filterCurrency) {
      this.filteredExpenses = this.filteredExpenses.filter((expense: { uniteMonetaire: string; }) => expense.uniteMonetaire === this.filterCurrency);
    }
    // Filter by date range
    if (parsedStartDate && parsedEndDate) {
      this.filteredExpenses = this.filteredExpenses.filter((expense: { dateDepence: string | number | Date; }) => {
        const expenseDate = new Date(expense.dateDepence);
        const start = new Date(parsedStartDate);
        const end = new Date(parsedEndDate);
        return start <= expenseDate && expenseDate <= end;
      });
    }
  }
  calculateTotalMontant(): number {
    return this.filteredExpenses.reduce((total: any, expense: { montant: any; }) => total + expense.montant, 0);
  }
}
