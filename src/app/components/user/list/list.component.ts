import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {UserService} from "../../../service/user.service";
import {NotificationService} from "../../../notification.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public filterText: string = '';
  public users: User[] = [];
  public filteredUsers: User[] = [];
  public pageSize: number = 10; // Number of items to display per page
  public currentPage: number = 1; // Current page number
  public totalItems: number = 0;
  p: number=1;
  constructor(private notificationService:NotificationService,
    private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers(true)
  }
  openEditUrl(){

  }


  public getUsers(showNotification: boolean) {
    this.userService.getUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
        this.totalItems=this.users.length;
        this.pageSize = Math.ceil(this.totalItems / this.pageSize);
        // If the current page exceeds the total pages, reset it to the last page
        if (this.currentPage > this.pageSize) {
          this.currentPage = this.pageSize;
        }
        this.updateFilteredBeneficiaire();

        this.filteredUsers = this.users; // Initialize filteredUsers with all users
        if (showNotification) {
          if (this.users.length > 0) {
            this.sentErrorNotification(NotificationType.SUCCESS, `${this.users.length} Utilisateur(s) trouve(s)`);
          } else {
            this.sentErrorNotification(NotificationType.INFO, `La liste est vide`);
          }
        }
        this.filterUsers(); // Apply initial filtering
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

  view(id: any ) {
    this.router.navigateByUrl(`BMS/user/view/${id}`)
}

  edit(id: any ) {
    this.router.navigateByUrl(`BMS/user/edit/${id}`)
  }


  public filterUsers() {
    console.log("FILTER")
    if (this.filterText.trim() === '') {
      // If filter input is empty, show all users
      this.filteredUsers = this.users;
    } else {
      // Filter users based on the input value
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
  public updateFilteredBeneficiaire() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredUsers = this.users.slice(startIndex, endIndex);
  }

  public goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pageSize) {
      this.currentPage = pageNumber;
      this.updateFilteredBeneficiaire();
    }
  }
}

