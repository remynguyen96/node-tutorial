import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { YoutubeComponent } from './youtube.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { DetailMessageComponent } from './detail-message/detail-message.component';
const routes : Routes = [
    {
        path: '',
        component: YoutubeComponent,
        children: [
            {
                path: 'chat-room',
                component: ChatRoomComponent,
            },
            {
                path: 'detail-message',
                component: DetailMessageComponent,
            },
        ]
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRouting {}