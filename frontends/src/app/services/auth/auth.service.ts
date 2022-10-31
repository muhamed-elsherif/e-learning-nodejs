import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  register(data:any): Observable<any>{
    return this._http.post("http://localhost:3000/user/register", data)
  }
  login(data:any): Observable<any>{
    return this._http.post("http://localhost:3000/user/login", data)
  }
}