import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {Beneficiaire} from "../model/Beneficiaire";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  private baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }


  public saveBeneficiare(formData: FormData): Observable<Beneficiaire | HttpErrorResponse>{
    return this.http.post<Beneficiaire>(`${this.baseUrl}beneficiaire`,formData)
  }

  public updateBeneficiare(formData: FormData): Observable<Beneficiaire | HttpErrorResponse>{
    return this.http.put<Beneficiaire>(`${this.baseUrl}beneficiaire`,formData)
  }

  public listBeneficiaire(): Observable<Beneficiaire[]>{
    return this.http.get<Beneficiaire[]>(`${this.baseUrl}beneficiaire`)
  }

  public getBeneficiaire(id:number): Observable<Beneficiaire | HttpErrorResponse>{
    return this.http.get<Beneficiaire>(`${this.baseUrl}beneficiaire/${id}`)
  }

  public deleteBeneficiaire(id:number): Observable<any | HttpErrorResponse>{
    return this.http.delete<any>(`${this.baseUrl}beneficiaire/${id}`)
  }

  public  getStatusInfo():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}beneficiaire/status/statistic`)
  }


  public createUserFormData(id:string,beneficiaire: Beneficiaire, profileImage:File):FormData{
    const formData=new FormData();
    formData.append("id",id);
    formData.append("code",beneficiaire.code);
    formData.append("nom",beneficiaire.nom);
    formData.append("prenom",beneficiaire.prenom);
    formData.append("sexe",beneficiaire.sexe);
    formData.append("status",beneficiaire.status);
    formData.append("dateNaissance",beneficiaire.dateNaissance);
    formData.append("niveauEtude",beneficiaire.niveauEtude);
    formData.append("telephone",beneficiaire.telephone);
    formData.append("nomPersonneReponse",beneficiaire.nomPersonneReponse);
    formData.append("phonePersonneResponsable",beneficiaire.phonePersonneResponsable);
    formData.append("dateIntegration",beneficiaire.dateIntegration);
    formData.append("type",beneficiaire.type);
    formData.append("adresse",beneficiaire.adresse);
    formData.append("commentaire",beneficiaire.commentaire);

    formData.append("numeroCompte",beneficiaire.numeroCompte);
    formData.append("numeroMoncash",beneficiaire.numeroMoncash);
    formData.append("groupe",beneficiaire.groupe);
    formData.append("profileImage",profileImage);

    return formData;
  }
}
