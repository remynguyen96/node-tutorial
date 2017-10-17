import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogsService } from "../shared/blogs.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  infomationBlog : FormGroup;
  categories : any[];
  slug : string = ' ';
  urlImage : string = 'http://localhost:4000/images/categories';

  constructor(
    private formBuilder : FormBuilder,
    private blogsService : BlogsService,
    private router : Router
  ) { }

  ngOnInit() {
    this.blogsService.showCategory().subscribe(
      result => {
        this.categories = result
      },
      err => {
         Materialize.toast(err, 2500,'notiError');
      }
    );
    this.dataBlog();
  }

  convertTitle(title){
    let valueSlug = this.blogsService.convertSlug(title);
    this.slug = valueSlug;
  }

  dataBlog(){
    this.infomationBlog = this.formBuilder.group({
      title : this.formBuilder.control(null, Validators.required),
      slug : this.formBuilder.control({value : null, disabled : true }, Validators.required),
      images : this.formBuilder.control(null, Validators.required),
      category : this.formBuilder.control(null, Validators.required),
      description : this.formBuilder.control(null, Validators.required),
      author : this.formBuilder.control(JSON.parse(localStorage.getItem('userInfo')).id),
    });
  }

  submitForm(data){
    data.slug = this.slug;
    let formData : FormData = new FormData();
        formData.append('data',JSON.stringify(data));
        formData.append('images',data.images[0]);
    this.blogsService.addBlog(formData)
        .subscribe(
          result => {
            Materialize.toast('Add blogs successfull', 2500,'notiSuccess rounded');
            this.router.navigate(['/blogs']);
          },
          err => {
            Materialize.toast(err, 2500,'notiError');
          }
        )
  }

}
