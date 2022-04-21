import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  miFormulario:FormGroup = this._fb.group({
    email:['test1@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [Validators.required, Validators.minLength(6) ]]
  })

  constructor( private _fb:FormBuilder,
               private _router:Router ) { }

  login(){
    console.log( this.miFormulario.value )
    this._router.navigateByUrl('/dashboard')
  }

}
