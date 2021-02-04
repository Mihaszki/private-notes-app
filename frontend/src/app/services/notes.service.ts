import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  getNotes() {
    return this.http.get<any>('http://localhost:3000/api/notes/');
  }
}
