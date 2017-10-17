import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiseComponent } from './advertise.component';
import { JobComponent } from './job/job.component';
import { CultureComponent } from './culture/culture.component';
import { AdvertiseRouting } from './advertise.routing';
import { AdDirective } from './ad.directive';
import { BannerComponent } from './banner/banner.component';
import { GlobalService } from './global.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    AdvertiseRouting
  ],
  declarations: [AdvertiseComponent, JobComponent, CultureComponent, AdDirective, BannerComponent],
  providers: [GlobalService],
  entryComponents: [ JobComponent, CultureComponent ],
})
export class AdvertiseModule { }
