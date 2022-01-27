import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // declaramos la variable de la url
  private _baseUrl: string = environment.baseUrl

  //Declaramos el usuario y le indicamos que tendrá valor cuando lo vayamos a usar
  private _usuario!: Usuario;

  //getter para obtener el usuario
  get usuario(): Usuario {

    //recuerda desestructurar los objetos para evitarte problemas en el futuro
    return { ...this._usuario };
  }

  //inyectamos nuestro servicios http
  constructor(private http: HttpClient) { }

  //Metodo para registrar nuevos usuarios en nuestra aplicacion
  registo(name: string, email: string, password: string) {


    const url: string = `${this._baseUrl}/auth/new`;

    const body = { name, email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {

            //Guardamos el token del usuario en la sesion
            localStorage.setItem('token', resp.token!)

            //Cuando el ok es true sabemos que la informacion de name y uid viene en la respuesta
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  login(email: string, password: string) {

    //Declaramos la constante de la url
    const url: string = `${this._baseUrl}/auth`;

    //Declaramos el cuerpo de la peticion
    const body = { email, password }

    //Devolvemos el metodo porque no nos vamos a suscribir aquí, sino que allá donde lo llamemos
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        //con tap ejecutamos una porcion de codigo antes de que pase a los siguientes operadores
        tap(resp => {
          if (resp.ok) {

            //Guardamos el token del usuario en la sesion
            localStorage.setItem('token', resp.token!)
      
            //Cuando el ok es true sabemos que la informacion de name y uid viene en la respuesta
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
      
          }
        }),
        //modificamos la respuesta para devolver solo lo que nos interese
        map(resp => resp.ok),
        //Para el caso de que de error mandamos false
        //con el operador of mandamos un observable de lo que queramos
        catchError(err => of(err.error.msg))
      );
  }

  //Metodo para hacer persisente la informacion del usuario
  validarToken(): Observable<boolean> {

    //Variable de la url
    const url: string = `${this._baseUrl}/auth/renew`;

    //Constante del header
    const header = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    //Necesitamos que la respuesta sea un booleano para el guar
    return this.http.get<AuthResponse>(url, { headers: header })
      .pipe(
        tap(resp => {
          if (resp.ok) {

            //Guardamos el token del usuario en la sesion
            localStorage.setItem('token', resp.token!)
      
            //Cuando el ok es true sabemos que la informacion de name y uid viene en la respuesta
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
      
          }
        }),
        //Extraemos de la respuesta el ok para tener solo el booleano
        map(resp => {
          return resp.ok
        }),
        //En el caso de que salte error le mandamos un observable con el valor de false
        catchError(resp => of(false))
      )
  }

  //Metodo para deslogearse de la aplicacion
  logout() {
    localStorage.removeItem('token');
  }

  private _customPipeUsuario(resp: AuthResponse) {


  }
}
