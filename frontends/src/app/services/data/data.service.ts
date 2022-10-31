import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient) { }

  public isLoggedIn = false
  public userData= null
  public allSubject = []

  register(data:any): Observable<any>{
    return this._http.post("http://localhost:3000/user/register", data)
  }
  login(data:any): Observable<any>{
    return this._http.post("http://localhost:3000/user/login", data)
  }

  me(): Observable<any>{
    return this._http.get("http://localhost:3000/user/me")
  }
  logout(): Observable<any>{
    return this._http.get("http://localhost:3000/user/logout")
  }

  getAllSubjects() :Observable<any>{
    return this._http.get("http://localhost:3000/subject/getAllSubjects")
  }
  singleSubject(id:string) : Observable<any>{
    return this._http.get(`http://localhost:3000/subject/singleSubject/${id}`)
  }
}