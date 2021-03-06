import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { confirmedValidator } from '../shared/confirmed.validator';
import { BackendError } from '../shared/backend.error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public backendError: BackendError, private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.backendError.isError = false;
  }

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: confirmedValidator('password', 'confirmPassword')
  });

  onSubmit() {
    this.authService.register(this.userName?.value, this.password?.value)
    .subscribe(() => {
      this.router.navigate(['../login'], { relativeTo: this.route, queryParams: { message: 'newaccount' } });
    }, error => this.backendError.error(error));
  }

  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

}
