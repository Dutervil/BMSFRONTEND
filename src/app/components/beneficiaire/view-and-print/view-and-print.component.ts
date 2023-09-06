import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationType} from "../../../enum/notification-type.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {DepenceService} from "../../../service/depence.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../notification.service";
import {BeneficiaireService} from "../../../service/beneficiaire.service";

@Component({
  selector: 'app-view-and-print',
  templateUrl: './view-and-print.component.html',
  styleUrls: ['./view-and-print.component.css']
})
export class ViewAndPrintComponent implements OnInit {
  // @ts-ignore
  @ViewChild('print') printableContent: ElementRef ;
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

  printElement() {
    // @ts-ignore
    const printContents = this.printableContent.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
