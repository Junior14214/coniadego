import { Component } from '@angular/core';
import { LoginService } from './login/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistemaConiadego';

  private exibeMenu: Boolean = false;
  abaAtiva = 1;

  constructor(private service: LoginService, private router: Router) {
    if(localStorage.getItem('token')){
      this.exibeMenu = true;
    }
  }

  logout(){
    localStorage.setItem('token', '')
    window.location.reload();
  }
}
