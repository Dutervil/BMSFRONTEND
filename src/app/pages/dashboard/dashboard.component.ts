import { Component, OnInit, ElementRef } from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import { Chart, registerables  } from 'node_modules/chart.js'
import {BeneficiaireService} from "../../service/beneficiaire.service";
import {DepenceService} from "../../service/depence.service";
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,
              private depenceService:DepenceService,
              private _dashboardService:DashboardService,private _beneService:BeneficiaireService) { }

  stats:any;
  currency:any;

  serverData: any[] = []
  expences: any[] = []
  ngOnInit(): void {


    this.getCountByTypeDepence();
    this.getStatisticAmount();
    this.getActive();
    this.getStatusStats();
    this.  getByCurrency();

  }

  getCountByTypeDepence(){
    this._dashboardService.getExpenceStats().subscribe(
      response=>{
        this.serverData=response;
        const labels = response.map(item => item[1]); // Extract labels
        const dataPoints =response.map(item => item[0]); // Extract data points
        const chart=new Chart("barchart", {
          type: 'bar',
          data: {
            labels:labels,
            datasets: [{
              label: 'Expence By Type',
              data:dataPoints,
              backgroundColor: [
                'blue',
                'gray',
                '#fc037b',

              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      },
      error => {
        console.log(error)
      }
    )
  }


  getActive(){
    new Chart("piechart", {
      type: 'pie',
      data: {
        labels: ['Active',  'Inactive'],
        datasets: [{
          label: 'Beneficiary',
          data: [12, 19],
          backgroundColor: [
            '#fc9803',
            '#03dbfc',

          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }



  getStatisticAmount(){
    this._dashboardService.statisticAmount().subscribe(
      response=>{
      this.stats=response;

      },
      error => {
        console.log(error)
      }
    )
  }

  getByCurrency(){
    this._dashboardService.getByCurrency().subscribe(
      response=>{
        this.currency=response;

      },
      error => {
        console.log(error)
      }
    )
  }

getStatusStats(){
    this._beneService.getStatusInfo().subscribe(
      resp=>{
        console.log(resp)
      },error => {
        console.log(error)
      }
    )
}

getDepence() :void {
    this.depenceService.listDepence().subscribe(
      response=>{
        this.expences=response;
        console.log("Liste de depence",this.expences)
      },error => {
        console.log(error)
      }
    )
}

}
