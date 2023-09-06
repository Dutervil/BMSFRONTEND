import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthenticationGuard} from "./authentication.guard";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./notification.service";
import {LoginComponent} from "./components/user/login/login.component";
import {FormsModule} from "@angular/forms";
import { AdminModuleModule } from './admin/admin-module.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {EditorModule} from "@tinymce/tinymce-angular";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NotificationModule,
        FormsModule,
        AdminModuleModule,
        MatButtonModule,
        MatIconModule,
      EditorModule,


    ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  exports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
