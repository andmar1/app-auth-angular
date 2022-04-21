import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  miFormulario:FormGroup = this._fb.group({
    email:['tonytolver@gmail.com', [ Validators.required, Validators.email ]],
    password: ['121212', [Validators.required, Validators.minLength(6) ]]
  })

  constructor( private _fb:FormBuilder,
               private _router:Router,
               private _authService:AuthService ) { }

  login(){
    // extraer datos del formulario 
    const { email, password } = this.miFormulario.value

    this._authService.login( email, password )
        .subscribe( resp =>{
          console.log( resp )
        });
    

    // this._router.navigateByUrl('/dashboard')
  }

}
