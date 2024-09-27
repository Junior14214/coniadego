import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router:Router) {
    if(this.getToken().length){
      router.navigate(['/home'])
    }
   }

  private email: string = "";
  private senha: string = "";
  private token: string = ""

  logar() {
    this.service.logar({ email: this.email, senha: this.senha }).subscribe((res: any) => {
      localStorage.setItem('token', "Bearer " + res.accessToken);
      window.location.reload();
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }



  ngOnInit() {
  }

}
