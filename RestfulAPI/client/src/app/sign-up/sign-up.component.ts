import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { GlobalService } from "../shared/global.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  infomationRegister : FormGroup;

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.formRegister();
  }

  formRegister(){
    this.infomationRegister = this.formBuilder.group({
      'name' : this.formBuilder.control(null,Validators.required),
      'email' : this.formBuilder.control(null,[Validators.required, Validators.email]),
      'password' : this.formBuilder.control(null,Validators.required),
    });
  }

  register(infomation){
    this.globalService.signUp(infomation)
          .subscribe(
          result => {},
          error => {
            Materialize.toast(error, 2500,'notiError');
          })
  }





}
