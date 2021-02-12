import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BackendError {
  constructor() {}
  public isError: boolean = false;
  public message: string = '';
  public error(message: string, isError: boolean = true) {
    this.isError = isError;
    this.message = message;
  }
}