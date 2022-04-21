import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario:FormGroup = this._fb.group({
    name: ['Test 5',[ Validators.required ]],
    email:['test5@test.com',[ Validators.required, Validators.email ]],
    password:['123456', [ Validators.required ]]
  })

  constructor( private _fb:FormBuilder) { }

  registro(){
    console.log( this.miFormulario.value )
    console.log( this.miFormulario.valid ) 
  }
}
