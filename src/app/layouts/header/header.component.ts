import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
              private route:Router,private authService:AuthenticationService) { }

  user: User=new User() ;

  ngOnInit(): void {
    if(localStorage.getItem("user")){
      // @ts-ignore
      this.user=JSON.parse(localStorage.getItem("user"))
    }
    console.log(this.user)
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  showProfile(username: string) {
      this.route.navigateByUrl("/BMS/user/profile")
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl("/login")
  }
}
