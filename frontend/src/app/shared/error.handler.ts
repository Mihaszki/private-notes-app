import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  }
  else {
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.message}`);
  }
  return throwError(error.error.message ? error.error.message : 'Something bad happened; please try again later.');
}