import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DepenceService {

  private baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }


  public saveDepence(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}depence`,data)
  }

  public updateDepence(formData: FormData): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}depence`,formData)
  }

  public listDepence(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}depence`)
  }

  public getDepence(id:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}depence/${id}`)
  }

  public getDepencesByBeneficiaireId(id: string | null): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}depence/beneficiaire/${id}`)
  }
  public delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}depence/${id}`)
  }



  public createUserFormData(id:number, idBeneficiaire:number,montant:number, type:string, date:string, description:string):FormData{
    const formData=new FormData();
    formData.append("id",id+"");
    formData.append("beneficiareId",idBeneficiaire+"");
    formData.append("montant",montant+"");
    formData.append("typeDepence",type);
    formData.append("dateDepence",date);
    formData.append("description",description);
    return formData;
  }
}
