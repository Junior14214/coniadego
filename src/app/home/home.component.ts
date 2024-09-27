import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: LoginService, private router:Router) { }

  logout(){
    localStorage.setItem('token', '')
    this.router.navigate(['/login'])
  }

  ngOnInit() {
  }

}
