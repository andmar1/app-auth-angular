import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs";
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private _authService:AuthService,
               private _router:Router ){

  }

  canActivate(): Observable<boolean> | boolean {
    // console.log(`Can activate`)
    return this._authService.validarToken()
        .pipe(
          tap( valid => {
            if (!valid) {
              this._router.navigateByUrl('/auth')    //si tiken no es valido sacarlo a auth
            }
          })
        )
  }

  canLoad(): Observable<boolean> | boolean {
    // console.log(`Can Load`)
    return this._authService.validarToken()
        .pipe(
          tap( valid => {
            if (!valid) {
              this._router.navigateByUrl('/auth')    //si tiken no es valido sacarlo a auth
            }
          })
        )
  }

}
