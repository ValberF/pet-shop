import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Usuario } from '../app/models/usuario.mode'
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = new BehaviorSubject<Usuario>(new Usuario('', '', '', new Date()));

  constructor(private http: HttpClient) { }

  signupUser(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBH8UH4ra4UlWlp2ikbhoxpoyvkr-ZbGJU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const usuario = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );

          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH8UH4ra4UlWlp2ikbhoxpoyvkr-ZbGJU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const usuario = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );
          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        }),
      );
  }

  logout() {
    alert("Deslogando...")
    this.usuario.next(new Usuario('', '', '', new Date()));
    localStorage.removeItem('userData');
  }
}
