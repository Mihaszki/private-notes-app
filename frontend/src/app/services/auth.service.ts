import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  urlPath: string = '';

  // Access Guard
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get clean URL without parameters
    const url = state.url.split('?')[0];
    if(!localStorage.getItem('token') && (url === '/login' || url === '/register')) {
      return true;
    }
    else if(localStorage.getItem('token') && (url === '/login' || url === '/register')) {
      this.router.navigate(['../notes'], { relativeTo: this.route });
      return false;
    }
    else if(localStorage.getItem('token')) {
      return true;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route });
      return false;
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { username: username, password: password })
    .pipe(
      tap((data: any) => this.createSession(data)),
      catchError(this.handleError),
      shareReplay()
    );
  }

  register(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/register', { username: username, password: password })
    .pipe(
      catchError(this.handleError),
      shareReplay()
    );
  }

  private createSession(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('expires_in', data.expiresIn);
  }

  logoutSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_in');
  }

  checkSession() {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.error}`);
    }
    // error.error.error is a message sent by backend
    return throwError(error.error.error ? error.error.error : 'Something bad happened; please try again later.');
  }
}
