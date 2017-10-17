import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { GlobalService } from "../shared/global.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  infomationLogin : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.formLogin();
  }

  formLogin(){
    this.infomationLogin = this.formBuilder.group({
      'email' : this.formBuilder.control(null,[Validators.required,Validators.email]),
      'password' : this.formBuilder.control(null,Validators.required),
    });
  }


  login(infomation){
    infomation.password = this.globalService.encryptCode(infomation.password);
    console.log(infomation.password);
    // console.log(this.globalService.decryptCode(infomation.password));



    // this.globalService.login(infomation)
    //       .subscribe(
    //         result => {},
    //         err => {
    //           Materialize.toast(err, 2500,'notiError');
    //         }
    //       )

  }

  // U2FsdGVkX1+TgfT9USCwx1JLcSWx9XP5P3JXnbhrac8=


}
