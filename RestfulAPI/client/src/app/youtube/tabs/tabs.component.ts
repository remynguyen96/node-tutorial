import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs : QueryList<TabComponent>;

  ngAfterContentInit() {
    this.tabs.forEach(tabInstance => {
      console.log(tabInstance)
    });
  }

}
