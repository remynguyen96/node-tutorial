import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { YoutubeComponent } from './youtube.component';
import { YoutubeRouting } from "app/youtube/youtube.routing";
import { YoutubePipe } from "app/youtube/youtube.pipe";
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { DetailMessageComponent } from './detail-message/detail-message.component';
import { GlobalService } from './global.service';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    CommonModule,
    YoutubeRouting,
    FormsModule,
  ],
  declarations: [YoutubeComponent,YoutubePipe, ChatRoomComponent, DetailMessageComponent, TabsComponent, TabComponent,],
  providers: [GlobalService]
})
export class YoutubeModule { }
