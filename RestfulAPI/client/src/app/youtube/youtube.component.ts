import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import * as moment from "moment";

@Injectable()
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  video : any[];
  idYoutube : string = 'fDO6soGw-Y8';
  API_TOKEN = 'AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0';
  queryBlogs :string;

  constructor(
    private http : Http,
  ) { }

  ngOnInit() {
        // this.search('minh-niem').subscribe(
        //   result => {
        //     this.video = result;
        //     console.log(this.video);
        //   },
        //   err => {
        //     console.log(err);
        //   }
        // )
    }


   search(query : any){
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&maxResults=15&type=video&key=${this.API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(itemYoutube => itemYoutube.items);
  }

  searchYoutube(infomation){
    this.search(infomation).subscribe(
      result => {
        this.video = result;
        console.log(this.video);
      },
      err => {
        console.log(err);

      }
    )
  }



}


// https://www.youtube.com/embed/${videoId}?autoplay=1
// `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}`+
// '&maxResults=50' +
// '&type=video' +
// '&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM'

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=minh-niem&maxResults=50&type=video&key=AIzaSyB_2GPDnB2ZdIYpwr39j3q94vnL0WaYEXk
