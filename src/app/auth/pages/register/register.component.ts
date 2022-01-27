import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['test4', [Validators.required]],
    email: ['test4@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],

  })

  //inyectamos servicio de formulario
  //inyectamos el servicio de para las rutas
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private as: AuthService
  ) { }

  ngOnInit(): void {
  }

  //metodo para registrar un usuario en la aplicacion
  register() {

    const { name, password, email } = this.miFormulario.value
    this.as.registo(name, email, password)
      .subscribe({
        next: resp => {
          if (resp === true) {
            //Si la informacion es correcta mandamos al usuario al panel de control
            Swal.fire('Manito', 'Usuario creado Correctamente', 'success')
            this.router.navigate(['dashboard'])

          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })

    // this.router.navigate(['dashboard'])
  }

}
