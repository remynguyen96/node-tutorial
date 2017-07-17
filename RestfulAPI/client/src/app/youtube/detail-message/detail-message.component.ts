import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.scss']
})
export class DetailMessageComponent implements OnInit {

  Allmessage : any = [];

  constructor(
    private globalService : GlobalService
  ) { }

  ngOnInit() {

    this.globalService.chatRom$.subscribe(
      result => {
        this.Allmessage.push(result);
      }
    )
  }

  sendMessage(message){
    this.globalService.detailMessageEvent(message);

  }

}
