import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  socket: any;

  Allmessage : any =[];

 constructor(
   private globalService : GlobalService
 ) {
    // this.socket = io.connect('http://localhost:4000');
  }

  ngOnInit() {
    this.globalService.detailMessage$.subscribe(
      result => {
        this.Allmessage.push(result);
      },
      err => {
        console.log(err);
      }
    )
  }

  sendMessage(message){
    this.globalService.chatRoomEvent(message);
  }



}
