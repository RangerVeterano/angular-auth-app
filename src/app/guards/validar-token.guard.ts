import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  //inyectamos nuestro servicio de peticiones
  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('can activate');
    return this.as.validarToken()
      .pipe(tap(valid => {
        //En el caso de que no pueda acceder lo sacamos al login
        if (!valid) {
          this.router.navigate(['/auth/login'])
        }
      }));

  }

  canLoad(): Observable<boolean> | boolean {
    console.log('can load');
    return this.as.validarToken()
      .pipe(tap(valid => {
        //En el caso de que no pueda acceder lo sacamos al login
        if (!valid) {
          this.router.navigate(['/auth/login'])
        }
      }));;
  }
}
