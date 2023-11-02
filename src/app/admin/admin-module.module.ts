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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {ViewUserComponent} from "../components/user/view-user/view-user.component";
import {MatChipsModule} from "@angular/material/chips";
import {AddDonComponent} from "../components/beneficiaire/add-don/add-don.component";
import {AddDocComponent} from "../components/beneficiaire/add-doc/add-doc.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ViewAndPrintComponent} from "../components/beneficiaire/view-and-print/view-and-print.component";
import {DocsComponent} from "../components/beneficiaire/docs/docs.component";
import {DocsListComponent} from "../components/beneficiaire/docs-list/docs-list.component";
import {DepencesListComponent} from "../components/beneficiaire/depences-list/depences-list.component";
import {NgxPaginationModule} from "ngx-pagination";





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
    ViewUserComponent,
    AddDonComponent,
    AddDocComponent
    ,ViewAndPrintComponent,DocsComponent,
    DocsListComponent,
    DepencesListComponent

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
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxPaginationModule

  ]
})
export class AdminModuleModule { }
