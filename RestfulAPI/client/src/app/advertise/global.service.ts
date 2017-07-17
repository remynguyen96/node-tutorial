import { Injectable } from '@angular/core';
import { AdItem } from './ad-item';
import { JobComponent } from './job/job.component';
import { CultureComponent } from './culture/culture.component';

@Injectable()
export class GlobalService {

  getAds(){
    return [
      new AdItem(JobComponent, {name : 'Remy Nguyen', job : 'Website Design'}),
      new AdItem(JobComponent, {name : 'Chau Nguyen', job : 'Developer Website'}),
      new AdItem(CultureComponent, {infomation : 'This is new posts about culture', time : '8AM Tomorrow'}),
      new AdItem(CultureComponent, {infomation : 'Chari Brown With Snoopy Dog', time : '6PM Tonight'})
    ]
  }

}
