import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Part1Component } from './part1/part1.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
import { AnimationComponent } from './animation.component';
const routes : Routes = [
    {
        path: '',
        component: AnimationComponent,
        children: [
            {
                path: 'part2',
                component: Part1Component,
            },
            {
                path: 'part2',
                component: Part2Component,
            },
            {
                path: 'part3',
                component: Part3Component,
            },
        ]
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimationRouting {}