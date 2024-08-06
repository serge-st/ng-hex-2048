import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: any) {
    const errorMessage = error instanceof Error || HttpErrorResponse ? error.message : '';

    this.zone.run(() => {
      // TODO: Place error handling component here
      alert(`Oops! An error 😬 ${errorMessage}`);
    });

    console.error('Error from global error handler', error);
  }
}
