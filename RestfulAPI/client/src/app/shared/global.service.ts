import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import * as CryptoJS from "crypto-js";
@Injectable()
export class GlobalService {
  urlServer: string = 'http://localhost:4000/api';

  private options : any;
  private iv  : any  = CryptoJS.enc.Base64.parse("#base64IV#");
  private passportCode  : string  = 'I-LOVE-MOM-20-07-1974';

constructor(
    private http : Http,
    private router : Router,
  ) {
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
        // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.options = new RequestOptions({ headers  : headers });
  }
encryptCode(str) : Observable<string>{
    let encrypt = CryptoJS.AES.encrypt(str, this.passportCode, {iv: this.iv});
    let encrypted = encrypt.toString();
    return encrypted;
  }

decryptCode(code) : Observable<string>{
    let decrypted = CryptoJS.AES.decrypt(code, this.passportCode, {iv: this.iv});
    return decrypted.toString(CryptoJS.enc.Utf8);
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

uploadImage(file : any){
    // return this.http.post(`${this.urlServer}/upload`,file,this.options)
    // return this.http.post(`${this.urlServer}/posts/upload`,file,this.options)
    return this.http.post('http://localhost:4000/api/blogs/upload-image',file,this.options)
                    .map((response : Response) => response.json())
                    .catch(this.handleError);
  }

login(infomationLogin : any) : Observable<any>{
      return this.http.post(`${this.urlServer}/user-login`,infomationLogin,this.options)
                    .map((response : Response) => this.authenticate(response,'Login successful !'))
                    .catch(this.handleError);
  }

signUp(infomationRegister : any) : Observable<any>{
    return this.http.post(`${this.urlServer}/user-register`,infomationRegister,this.options)
                    .map((response : Response) => {
                      this.authenticate(response,'User registered !');
                    } )
                    .catch(this.handleError);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
private authenticate(res: any,message: string) {
      let authResponse = res.json();
      if(authResponse.errors){
        return Materialize.toast(authResponse.errors, 2500,'notiError');
      }
      if (!authResponse.token) {
        return;
      }
      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('userInfo', JSON.stringify(authResponse.user));
      Materialize.toast(message, 2500,'notiSuccess rounded');
      this.router.navigate(['/profile']);
  }

  get isAuthenticated(){
      return !!localStorage.getItem('token');
  }

  get tokenHeader(){
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return new RequestOptions({ headers  : headers });
  }



}
