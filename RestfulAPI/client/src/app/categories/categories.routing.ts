import { NgModule} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "app/categories/categories.component";
import { UpdateComponent } from "app/categories/update/update.component";
import { CreateComponent } from "app/categories/create/create.component";

const routes : Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRouting {}