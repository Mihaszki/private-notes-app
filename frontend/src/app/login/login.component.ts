import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if(params.get('message') === 'newaccount') this.newAccount = true;
      else if(params.get('message') === 'logout') this.logoutMessage = true;
    });
  }

  newAccount: boolean = false;
  logoutMessage: boolean = false;
  isBackendError: boolean = false;
  backendErrorMessage: string = '';

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.authService.login(this.loginForm.controls['userName'].value,
    this.loginForm.controls['password'].value)
    .subscribe(() => {
      this.router.navigate(['../notes'], { relativeTo: this.route });
    }, error => {
      this.isBackendError = true;
      this.backendErrorMessage = error;
    });
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
}
