import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationComponent } from './animation.component';
import { Part1Component } from './part1/part1.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
import { AnimationRouting } from './animation.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalServiceAnimation } from './global.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnimationRouting,
  ],
  providers: [GlobalServiceAnimation],
  declarations: [AnimationComponent, Part1Component, Part2Component, Part3Component]
})
export class AnimationModule { }
