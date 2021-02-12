import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendError } from '../shared/backend.error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public backendError: BackendError, private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.backendError.isError = false;
    this.route.queryParamMap.subscribe((params) => {
      if(params.get('message') === 'newaccount') this.newAccount = true;
      else if(params.get('message') === 'logout') this.logoutMessage = true;
    });
  }

  newAccount: boolean = false;
  logoutMessage: boolean = false;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.authService.login(this.userName?.value, this.password?.value)
    .subscribe(() => {
      this.router.navigate(['../notes'], { relativeTo: this.route });
    }, error => this.backendError.error(error));
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
}
