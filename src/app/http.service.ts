import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  options: any;
  resp: Observable<ArrayBuffer> = new Observable<ArrayBuffer>();
  token: any;

  constructor(
    private http: HttpClient,
  ) {
    const h = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.options = {
      headers: h
    };
  }

  jwtAuth$(userName:string, password:string){
    console.log('jwtAuth()/01')
    // const requestUrl = `${environment.wsEndpoint}/auth?username=${userName}&password=${password}`
    const requestUrl = 'http://localhost:3000/auth?username=' + userName + '&password=' + password;
    return this.http.get(requestUrl, this.options);
  }
}
