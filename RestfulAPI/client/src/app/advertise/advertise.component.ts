import { Component, OnInit } from '@angular/core';
import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit  {

  ads: AdItem[];

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.ads = this.globalService.getAds();
  }



}
