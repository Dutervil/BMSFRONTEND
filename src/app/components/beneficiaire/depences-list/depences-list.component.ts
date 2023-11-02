import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DepenceService} from "../../../service/depence.service";

@Component({
  selector: 'app-depences-list',
  templateUrl: './depences-list.component.html',
  styleUrls: ['./depences-list.component.css']
})
export class DepencesListComponent implements OnInit {

  constructor(private router:Router,private depenceService:DepenceService) { }
  beneficiare:any;
  depence:any=[]
  amounts:any=[];
  filteredExpenses:any=[];
  total:any;
  filterTypeDepence = '';
  startDate = '';
  endDate = '';
  p:number=1
  ngOnInit(): void {
    this.filteredExpenses = this.depence;
    this.getExpences();
  }

  goToCreateDepence() {
 this.router.navigate(['BMS/beneficiaire/don'])

  }

  getExpences(){

    this.depenceService.listDepence().subscribe(
      response=>{
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
}
