import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { confirmedValidator } from '../shared/confirmed.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: confirmedValidator('password', 'confirmPassword') });

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.controls['userName'].value,
    this.loginForm.controls['password'].value)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }
}
