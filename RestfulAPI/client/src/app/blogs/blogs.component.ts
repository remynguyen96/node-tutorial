import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogsService } from "./shared/blogs.service";
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, AfterViewInit   {

  blogs : any[];

  urlImage : string = 'http://localhost:4000/images/blogs';

  constructor(
    private blogsService : BlogsService
  ) {

  }

  ngOnInit() {
    this.blogsService.showBlog().subscribe(
      result => {
        this.blogs = result;
      },
      err => {
        Materialize.toast(err, 2500,'notiError');
      }
    )
  }

  ngAfterViewInit() {
    $('ul.tabs').tabs();

  }

}
