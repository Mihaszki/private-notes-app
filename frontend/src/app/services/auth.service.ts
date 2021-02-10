import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { backendConfig } from '../backend.config';
import { handleError } from '../shared/error.handler';

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
    const isLogged: boolean = this.isLoggedIn();
    const session: boolean = this.checkSession();

    if(isLogged && !session) {
      this.logoutSession();
      return false;
    }
    if(isLogged && session) {
      if(url === '/login' || url === '/register') {
        this.router.navigate(['/notes']);
        return false;
      }
      else {return true;}
    }
    else {
      if(url !== '/login' && url !== '/register') {
        this.router.navigate(['/login']);
        return false;
      }
      else {return true;}
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${backendConfig.url}/auth/login`, { username: username, password: password })
    .pipe(
      tap((data: any) => this.createSession(data)),
      catchError(handleError),
      shareReplay()
    );
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${backendConfig.url}/auth/register`, { username: username, password: password })
    .pipe(
      catchError(handleError),
      shareReplay()
    );
  }

  private createSession(data: any) {
    localStorage.setItem('token', data.token);
    // Time is in minutes e.g. 10m
    const expiresIn: number = parseInt(data.expiresIn);
    const now = new Date();
    const expiresAt: number = now.setMinutes(now.getMinutes() + expiresIn);
    localStorage.setItem('expires_at', expiresAt.toString());
  }

  logoutSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login'], { queryParams: { message: 'logout' } });
  }

  checkSession(): boolean {
    const expiresAt: any = localStorage.getItem('expires_at');
    if(Date.now() > expiresAt) {
      return false;
    }
    return true;
  }

  isLoggedIn() {
    if(!localStorage.getItem('token') || !localStorage.getItem('expires_at')) return false;
    return true;
  }
}
