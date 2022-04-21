import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario:FormGroup = this._fb.group({
    name: ['Test prueba',[ Validators.required ]],
    email:['prueba@gmail.com',[ Validators.required, Validators.email ]],
    password:['123456', [ Validators.required ]]
  })

  constructor( private _fb:FormBuilder, 
               private _router:Router,
               private _authService:AuthService ) { }

  registro(){
    // extraer datos del formulario 
    const { name, email, password } = this.miFormulario.value 

    this._authService.registro( name, email, password )
        .subscribe( ok =>{
          if (ok === true) {
            this._router.navigateByUrl('/dashboard')
            Swal.fire({
            icon:'success',
            text:'registro correcto',
            title:'Login correcto'
            })
          }
          else{
            Swal.fire( {
              icon:'error',
              text:ok,
              title:'Login incorrecto'
            })
          }
        })    
  }
}
