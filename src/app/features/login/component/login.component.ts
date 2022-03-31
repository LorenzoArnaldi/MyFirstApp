import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/auth/models/login/login.models';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  dataB = 
    {
      title: "Login"
    }
  ;

  ngOnInit(): void {}

  public login() {
    this.authService.login();
  }
}
