import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

import { AuthResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl; 

  constructor( private _http:HttpClient ) { }

  login( email:string, password:string ){
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this._http.post<AuthResponse>(url, body );
  }
}
