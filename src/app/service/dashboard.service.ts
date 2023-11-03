import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }


  getExpenceStats(){
    return this.http.get<any[]>(`${this.baseUrl}dashboard/count-by-type`);

  }
  statisticAmount(){
    return this.http.get<any>(`${this.baseUrl}dashboard/statistic/total`);

  }

  getByCurrency(){
    return this.http.get<any>(`${this.baseUrl}dashboard`);

  }
}
