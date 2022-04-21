import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { AuthResponse, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl; 
  private _usuario!:Usuario;

  get usuario(){
    return {...this._usuario};    
  }

  constructor( private _http:HttpClient ) { }

  login( email:string, password:string ){
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this._http.post<AuthResponse>(url, body )
        .pipe(
          map( resp => resp.ok ), //muta la respuesta, al ser ok muestra un booleano,si es correcta true sino false
          catchError( err => of(false)) //atrapar error 
        )
  }
}
