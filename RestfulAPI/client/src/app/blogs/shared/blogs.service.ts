import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { GlobalService } from "../../shared/global.service";
@Injectable()
export class BlogsService {

  urlServer: string = 'http://localhost:4000/api';

  constructor(
    private http : Http,
    private router : Router,
    private globalService : GlobalService,
  ) { }



  convertSlug(str : string) :string{
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
      str = str.replace(/-+-/g, "-");
      str = str.replace(/^\-+|\-+$/g, "");
      return str;
  }

  addBlog(infomation : any){
    return this.http.post(`${this.urlServer}/create-blogs`,infomation,this.globalService.tokenHeader)
        .map((res : Response) => res.json())
        .catch(this.handleError);
  }

  showBlog(){
    return this.http.get(`${this.urlServer}/read-blogs`,this.globalService.tokenHeader)
        .map((res : Response) => res.json())
        .catch(this.handleError);
  }
   showCategory(){
    return this.http.get(`${this.urlServer}/read-category`,this.globalService.tokenHeader)
        .map((res : Response) => res.json())
        .catch(this.handleError);
  }

  // updateBlog(slug : any){
  //   return this.http.put(`${this.urlServer}/update-blogs`,slug,this.globalService.tokenHeader)
  //       .map((res : Response) => res.json())
  //       .catch(this.handleError);
  // }

  // deleteBlog(slug : any){
  //   return this.http.delete(`${this.urlServer}/delete-blogs`,slug,this.globalService.tokenHeader)
  //       .map((res : Response) => res.json())
  //       .catch(this.handleError);
  // }

  private handleError(err) {
    let errMessage: string;
    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }


}



