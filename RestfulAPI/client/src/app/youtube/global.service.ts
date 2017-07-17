import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class GlobalService {

  constructor() { }

  private chatRom = new Subject<string>();
  private detailMessage = new Subject<string>();


  chatRom$ = this.chatRom.asObservable();
  detailMessage$ = this.detailMessage.asObservable();

  chatRoomEvent(message : string){
    this.chatRom.next(message);
  }

  detailMessageEvent(message : string){
    this.detailMessage.next(message);
  }

}
