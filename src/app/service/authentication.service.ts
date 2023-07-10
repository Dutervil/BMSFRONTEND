import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public baseUrl=environment.baseUrl;
  private loggedInUsername: any;
  private token: any;
  private jwtHelper=new  JwtHelperService();
  constructor(private http:HttpClient) { }


  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.baseUrl}user/login`,user,{observe: 'response'});
  }

  public register(user: User): Observable<User | HttpErrorResponse>{
    return this.http.post<User | HttpErrorResponse>(`${this.baseUrl}user/register`,user);
  }

  public logout(){
    this.token = null;
    this.loggedInUsername=null;
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('users')
  }
  public saveToken(token : string){
    this.token=token;
    localStorage.setItem("token",token)
  }
  public addUserToLocalCache(user: User){
    localStorage.setItem("user",JSON.stringify(user))
  }

  public getUserToLocalCache(): User {
   // @ts-ignore
    return JSON.parse(localStorage.getItem("user"));
  }

  public loadToken(){
    this.token =localStorage.getItem("token")
  }
  // @ts-ignore
  public isLoggedIn(): boolean{
    this.loadToken();
    if (this.token !=null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub !=null || ''){
        if (!this.jwtHelper.isTokenExpired(this.token)){
         this.loggedInUsername=this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else{
      this.logout()
      return false;
    }
  }

  public getToken(): string{
    return this.token;
  }
}
