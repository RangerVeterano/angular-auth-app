import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  * {
    margin: 15px;
  }
  `]
})
export class DashboardComponent implements OnInit {


  get usuario() {
    return this.as.usuario;
  }

  //inyectamos el servicio de rutas
  constructor(
    private router: Router,
    private as: AuthService) { }


  ngOnInit(): void {
  }

  //metodo para deslogearse de la aplicacion
  logout() {

    this.router.navigateByUrl('/auth/login')
    this.as.logout()
  }

}
