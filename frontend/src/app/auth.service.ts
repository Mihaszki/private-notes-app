import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { username: username, password: password })
    .pipe(
      tap((data: any) => this.createSession(data)),
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

  constructor(private http: HttpClient) { }
}
