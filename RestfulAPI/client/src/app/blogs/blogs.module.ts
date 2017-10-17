import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { BlogsService } from "app/blogs/shared/blogs.service";
import { BlogsRouting } from "app/blogs/blogs.routing";
import { MaterializeModule } from 'ng2-materialize';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "app/share-module/shared-module";
@NgModule({
  imports: [
    CommonModule,
    BlogsRouting,
    FormsModule,
    MaterializeModule.forRoot(),
    SharedModule
  ],
  declarations: [
    BlogsComponent,
    CreateComponent,
    EditComponent,
  ],
  providers: [BlogsService]
})
export class BlogsModule { }
