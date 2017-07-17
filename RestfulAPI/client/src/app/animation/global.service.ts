import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from "../shared/global.service";
@Injectable()
export class GlobalServiceAnimation {

  urlServer: string = 'http://localhost:4000/api';


  constructor(
    private http : Http,
    private globalService : GlobalService,
  ) {

  }

  mailContact(infomationMail : any) : Observable<any> {
    return this.http.post(`${this.urlServer}/contact-mail`,infomationMail,this.globalService.tokenHeader)
        .map((res : Response) => res.json())
        .catch(this.handleError);
  }

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
