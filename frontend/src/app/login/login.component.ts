import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  onSubmit() {
    console.log(this.loginForm.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
