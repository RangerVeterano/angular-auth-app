import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  //inyectamos servicio de contructor de formularios
  //inyectamos servicio para controlar las rutas
  //inyectamos nuestro servicio para las peticiones
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void {
  }

  //metodo de login 
  login() {
    console.log(this.miFormulario.value);

    //Extraemos los valores del formulario
    const { email, password } = this.miFormulario.value;

    this.as.login(email, password)
      .subscribe({
        next: ok => {

          if (ok === true) {
            //Si la informacion es correcta mandamos al usuario al panel de control
            this.router.navigate(['dashboard'])

          } else {
            Swal.fire('Error', ok, 'error')
          }
        }
      })
  }
}
