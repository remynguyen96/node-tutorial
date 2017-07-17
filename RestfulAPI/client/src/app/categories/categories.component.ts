import { Component, OnInit } from '@angular/core';
import { CategoriesService } from "./shared/categories.service"
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : any[];

  urlImage : string = 'http://localhost:4000/images/categories';

  constructor(
    private categoriesService : CategoriesService
  ) { }

  ngOnInit() {
    this.categoriesService.showCategory().subscribe(
      result => {
        this.categories = result;
      },
      err => {
        Materialize.toast(err, 2500,'notiError');
      }
    )
  }

}
