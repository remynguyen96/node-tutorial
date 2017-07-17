import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "../shared/categories.service";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  infomation : FormGroup;
  slug : string = ' ';

  constructor(
    private formBuilder : FormBuilder,
    private categoriesService : CategoriesService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.formCategory();
  }

  formCategory(){
    this.infomation = this.formBuilder.group({
      title : this.formBuilder.control(null,Validators.required),
      slug : this.formBuilder.control({value : null, disabled : true },Validators.required),
      images : this.formBuilder.control(null,Validators.required),
    });
  }

  convertTitle(title){
    let valueSlug = this.categoriesService.convertSlug(title);
    this.slug = valueSlug;
  }

  addCategory(data){
    data.slug = this.slug;
    let formData : FormData = new FormData();
        formData.append('data',JSON.stringify(data));
        formData.append('images',data.images[0]);
    this.categoriesService.addCategory(formData)
        .subscribe(
          result => {
            if(result.success === false){
              Materialize.toast(result.message, 2500,'notiError');
            }else{
              Materialize.toast('Add category successfull', 2500,'notiSuccess rounded');
              this.router.navigate(['/categories']);
            }
          },
          err => {
            Materialize.toast(err, 2500,'notiError');
          }
        )
  }





}
