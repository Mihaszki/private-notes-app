import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { confirmedValidator } from '../shared/confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: confirmedValidator('password', 'confirmPassword')
  });

  onSubmit() {
    this.authService.register(this.registerForm.controls['userName'].value,
    this.registerForm.controls['password'].value)
    .subscribe(() => {
      this.router.navigate(['../login?message=newaccount'], { relativeTo: this.route });
    }, error => console.log(error));
  }

  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

}
