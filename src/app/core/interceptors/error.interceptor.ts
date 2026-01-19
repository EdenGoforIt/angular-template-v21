// Disabling eslint for any type based on Angular official website
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '@app/core/services/alertify.service';

import { catchError, Observable, throwError } from 'rxjs';

const NS_BINDING_ERROR_STATUS_CODE = 0;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  readonly #alert = inject(AlertifyService);
  readonly #router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          return this.#httpResponseErrorHandler(req, error);
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Intercept errors
   * @param request request
   * @param errorEvent HttpErrorResponse
   */
  #httpResponseErrorHandler(request: HttpRequest<any>, errorEvent: HttpErrorResponse) {
    let errorMessage = '';

    this.#logHttpErrorResponse(request, errorEvent);

    switch (errorEvent.status) {
      case HttpStatusCode.BadRequest:
        errorMessage = this.#handle400(errorEvent, errorMessage);
        break;
      case HttpStatusCode.Unauthorized:
        errorMessage = this.#handle401(errorEvent, errorMessage);
        break;
      case HttpStatusCode.Conflict:
        errorMessage = this.#handle409(errorEvent, errorMessage);
        break;
      default:
        errorMessage = this.#handleDefaultError(errorEvent, errorMessage);
        break;
    }

    return throwError(() => errorMessage);
  }

  #handleDefaultError(event: HttpErrorResponse, errorMessage: string): string {
    // This is to avoid the rate limit set by APIGEE Gateway.
    // This is alo to catch NS_BINDING_ABORTED, related to us sending to many, it gets cancelled as we send to much
    if (
      event.url?.includes('/harmony/address') &&
      (event.status == HttpStatusCode.TooManyRequests || event.status == NS_BINDING_ERROR_STATUS_CODE)
    ) {
      console.error(event?.message);
    } else {
      this.#alert.error('Unable to process your request.');
    }
    errorMessage = event?.message;
    return errorMessage;
  }

  #handle401(event: HttpErrorResponse, errorMessage: string): string {
    this.#alert.error('Unable to process your request.');
    errorMessage = event?.message;
    return errorMessage;
  }

  #handle409(event: HttpErrorResponse, errorMessage: string): string {
    errorMessage = event?.error?.detail;
    this.#alert.error(errorMessage ?? 'Unable to process your request.');
    return errorMessage;
  }

  #handle400(event: HttpErrorResponse, errorMessage: string): string {
    const errors = event.error?.errors;
    if (errors != null) {
      //Catches errors from dto validators
      Object.values(errors).forEach((msg: any) => {
        this.#alert.error(msg[0]);
        errorMessage = msg[0];
      });
    } else {
      //Catches errors from DependencyValidators ie IRequire, IConflict
      const error = event.error;
      errorMessage = (error.detail ?? error) ? error[Object.keys(error)[0]] : '';
      this.#alert.error(errorMessage);
    }

    return errorMessage;
  }

  #logHttpErrorResponse(request: HttpRequest<any>, event: HttpErrorResponse) {
    if (request.url.endsWith('/token')) {
      console.error('Unauthorised');
      void this.#router.navigate(['/home']);
    } else {
      console.error(`Error: ${event.status}, message: ${JSON.stringify(event.message)}`);
    }
  }
}
