import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FileValueAccessor } from "./file-value-accessor.directive";
@NgModule({
  imports: [CommonModule,ReactiveFormsModule],
  declarations: [FileValueAccessor],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FileValueAccessor
  ]
})
export class SharedModule { }
