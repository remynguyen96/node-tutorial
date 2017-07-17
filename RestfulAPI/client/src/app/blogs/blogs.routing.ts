import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditComponent } from "app/blogs/edit/edit.component";
import { CreateComponent } from "app/blogs/create/create.component";
import { BlogsComponent } from "app/blogs/blogs.component";

const routes : Routes = [
    {
        path: '',
        component: BlogsComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: 'update',
        component: EditComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRouting {}