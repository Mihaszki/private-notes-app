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
    return this.http.get<any>('http://localhost:3000/api/notes/')
    .pipe(
      catchError(this.handleError)
    );
  }

  saveNote(title: string, text: string) {
    return this.http.post<any>('http://localhost:3000/api/notes/', { title: title, body: text })
    .pipe(
      catchError(this.handleError),
      shareReplay()
    );
  }

  deleteNote(id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/notes/${id}`)
    .pipe(
      catchError(this.handleError),
      shareReplay()
    );
  }

  editNote(id: string, title: string, text: string) {
    return this.http.put<any>(`http://localhost:3000/api/notes/${id}`, { title: title, body: text })
    .pipe(
      catchError(this.handleError),
      shareReplay()
    );
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
