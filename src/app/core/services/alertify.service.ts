// Disabling any type check as callback can be any type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e: any) {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
