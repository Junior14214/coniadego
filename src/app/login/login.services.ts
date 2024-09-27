import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private urlLogin: string = 'http://localhost:3000/auth/login';
    private urlUsuarioLogado: string = 'http://localhost:3000/login';
    private urlLogout: string = 'http://localhost:3000/auth/logout';

    constructor(private http: HttpClient, private router: Router) { }

    public logar(dto: any) {
        return this.http.post(this.urlLogin, dto);
    }

    public deslogar() {
        return this.http.post(this.urlLogout, {});
    }

    public usuarioLogado() {
        return this.http.post(this.urlUsuarioLogado, null, {
            headers: new HttpHeaders()
                .set('Authorization', localStorage.getItem('token')),
            responseType: 'text'
        }).pipe(map(res => {
            let boolValue = JSON.parse(res);
            return boolValue;
        }),
            catchError((err, caught) => {
                this.router.navigate(['/login']);
                localStorage.setItem('token', '');
                window.location.reload();
                return null;
            }));
    }
    /**return this.http.post(this.urlLogar, dto, {
      headers: new HttpHeaders()
      .set('Authorization', '')
    })**/
}
