import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

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

  registro( name:string, email:string, password:string ){

    const url = `${this.baseUrl}/auth/new`
    const body = { name, email, password }

    return this._http.post<AuthResponse>(url, body )
      .pipe(
        tap( resp =>{
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg)),
      );
  }

  login( email:string, password:string ){
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this._http.post<AuthResponse>(url, body )
        .pipe(
          tap( resp => {   //Validacion
            if (resp.ok ) {
              localStorage.setItem('token', resp.token!)   //guardar token en local storage 
            }
          }),
          map( resp => resp.ok ), //muta la respuesta, al ser ok muestra un booleano,si es correcta true sino false
          catchError( err => of(err.error)) //atrapar error,  convertit false a observable
        );
  }

  validarToken():Observable<boolean>{   //funcion bool para que lo acepte el guard
    
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');   //jalar token del local storage

    return this._http.get<AuthResponse>( url, { headers })
        .pipe(
          map( resp => {
            // console.log(resp.token)   //ver jwt reestablecidos 
            localStorage.setItem('token', resp.token!)   //guardar token en local storage 
            this._usuario = {  //Establecer informacion al usuario
              name: resp.name!,
              uid:resp.uid!,
              email:resp.email!
            }

            return resp.ok;
          }),
          catchError(err => of(false))
        )
  }

  logout(){
    localStorage.clear()  //Borrar todo lo del local storage del login
  }

}
