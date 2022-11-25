import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/public';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(obj): Observable<any> {
    return this.httpClient.post(AUTH_API + '/login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'reset-password', {
      username: username,
    }, this.httpOptions);
  }

  doResetPassword(password: string, name: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'do-reset-password/' + name, {
      password: password
    }, this.httpOptions);
  }
}
