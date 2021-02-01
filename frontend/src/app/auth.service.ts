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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) { }
}
