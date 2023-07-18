import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {NotifierModule} from "angular-notifier";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../layouts/header/header.component";
import {FooterComponent} from "../layouts/footer/footer.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {ListComponent} from "../components/user/list/list.component";
import {ResgisterComponent} from "../components/user/resgister/resgister.component";
import {FormsModule} from "@angular/forms";
import {UserProfileComponent} from "../components/user/user-profile/user-profile.component";
import {
  AddBeneficiareFormComponent
} from "../components/beneficiaire/add-beneficiare-form/add-beneficiare-form.component";
import {ListBeneficiareComponent} from "../components/beneficiaire/list-beneficiare/list-beneficiare.component";
import {ViewBeneficiareComponent} from "../components/beneficiaire/view-beneficiare/view-beneficiare.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {EditBeneficiareComponent} from "../components/beneficiaire/edit-beneficiare/edit-beneficiare.component";
import {EditUserComponent} from "../components/user/edit-user/edit-user.component";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from "../components/user/login/login.component";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ListComponent,
    ResgisterComponent,
    UserProfileComponent,
    AddBeneficiareFormComponent,
    ListBeneficiareComponent,
    ViewBeneficiareComponent,
    EditUserComponent,
    EditBeneficiareComponent,

  ],
  imports: [
    CommonModule,
    NotifierModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule

  ]
})
export class AdminModuleModule { }
