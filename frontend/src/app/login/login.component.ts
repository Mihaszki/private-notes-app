import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value)
    .subscribe(res => console.log(res));
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
