import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/user/login/login.component";
import {PagesError404Component} from "./pages/pages-error404/pages-error404.component";
import {ResgisterComponent} from "./components/user/resgister/resgister.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {AdminLayoutComponent} from "./admin/admin-layout/admin-layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ListComponent} from "./components/user/list/list.component";
import {ViewUserComponent} from "./components/user/view-user/view-user.component";
import {
  AddBeneficiareFormComponent
} from "./components/beneficiaire/add-beneficiare-form/add-beneficiare-form.component";
import {ListBeneficiareComponent} from "./components/beneficiaire/list-beneficiare/list-beneficiare.component";
import {ViewBeneficiareComponent} from "./components/beneficiaire/view-beneficiare/view-beneficiare.component";
import {EditBeneficiareComponent} from "./components/beneficiaire/edit-beneficiare/edit-beneficiare.component";
import {AuthenticationGuard} from "./authentication.guard";
import {EditUserComponent} from "./components/user/edit-user/edit-user.component";
import {AddDonComponent} from "./components/beneficiaire/add-don/add-don.component";
import {AddDocComponent} from "./components/beneficiaire/add-doc/add-doc.component";
import {ViewAndPrintComponent} from "./components/beneficiaire/view-and-print/view-and-print.component";
import {DocsComponent} from "./components/beneficiaire/docs/docs.component";




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: "/login",pathMatch:'full' },
  { path: 'BMS', component: AdminLayoutComponent,canActivate: [AuthenticationGuard],

  children:[
    {path:'',component:DashboardComponent},
    {path:'user/register',component:ResgisterComponent},
    {path:'user/list',component:ListComponent},
    {path:'user/view/:id',component:ViewUserComponent},
    {path:'user/profile/:username',component:UserProfileComponent},
    {path:'user/edit/:id',component:EditUserComponent},
    { path: 'beneficiaire-add', component: AddBeneficiareFormComponent },
    { path: 'beneficiaire-list', component: ListBeneficiareComponent },
    { path: 'beneficiaire-view/:id', component: ViewBeneficiareComponent },
    { path: 'beneficiaire-view/doc/:id', component: DocsComponent },
    { path: 'beneficiaire-edit/:id', component: EditBeneficiareComponent },
    { path: 'expences/report/:id', component: ViewAndPrintComponent },
    { path: 'beneficiaire/don', component: AddDonComponent },
    { path: 'beneficiaire/doc', component: AddDocComponent },

  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
