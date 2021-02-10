import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { backendConfig } from '../backend.config';
import { handleError } from '../shared/error.handler';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  getNotes() {
    return this.http.get<any>(`${backendConfig.url}/notes/`)
    .pipe(
      catchError(handleError)
    );
  }

  saveNote(title: string, text: string) {
    return this.http.post<any>(`${backendConfig.url}/notes/`, { title: title, body: text })
    .pipe(
      catchError(handleError),
      shareReplay()
    );
  }

  deleteNote(id: string) {
    return this.http.delete<any>(`${backendConfig.url}/notes/${id}`)
    .pipe(
      catchError(handleError),
      shareReplay()
    );
  }

  editNote(id: string, title: string, text: string) {
    return this.http.put<any>(`${backendConfig.url}/notes/${id}`, { title: title, body: text })
    .pipe(
      catchError(handleError),
      shareReplay()
    );
  }
}
