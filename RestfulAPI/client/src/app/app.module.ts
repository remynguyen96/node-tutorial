import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app.routing";
import { MaterializeModule } from 'ng2-materialize';
// NOTE: Service Component
import { GlobalService } from "./shared/global.service";
import { AuthGuard } from "./shared/auth.guard";
// NOTE: All Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SharedModule } from "./share-module/shared-module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    ProfileComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule.forRoot(),
    SharedModule,
  ],
  providers: [GlobalService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
