import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { CategoriesService } from "app/categories/shared/categories.service";
import { CategoriesRouting } from "app/categories/categories.routing";
import { MaterializeModule } from "ng2-materialize/dist";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "app/share-module/shared-module";
@NgModule({
  imports: [
    CommonModule,
    CategoriesRouting,
    FormsModule,
    MaterializeModule.forRoot(),
    SharedModule
  ],
  declarations: [CategoriesComponent, UpdateComponent, CreateComponent],
  providers: [CategoriesService]
})
export class CategoriesModule { }
