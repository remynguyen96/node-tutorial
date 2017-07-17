import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdvertiseComponent } from './advertise.component';
import { JobComponent } from './job/job.component';
import { CultureComponent } from './culture/culture.component';
const routes : Routes = [
    {
        path: '',
        component: AdvertiseComponent,
        children: [
            {
                path: 'job',
                component: JobComponent,
            },
            {
                path: 'culture',
                component: CultureComponent,
            },
        ]
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiseRouting {}