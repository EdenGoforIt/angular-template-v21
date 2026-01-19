import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@app/shared/models/auth/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  getUser(): Observable<User> {
    return this.#http.get(location.origin + '/user').pipe(map((data) => data as User));
  }

  getToken(): Observable<string> {
    const requestOptions = { responseType: 'text' } as Record<string, unknown>;
    return this.#http.get<string>(location.origin + '/token', requestOptions).pipe(
      map((response) => {
        // If Mass returns login html
        if (response.trim().startsWith('<!DOCTYPE html>') || response.trim().startsWith('<html')) {
          window.location.href = '/home';
          throw new Error('Unexpected HTML response instead of token.');
        }
        return response; // Return the token if valid
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  logout(): Observable<string> {
    const requestOptions = { responseType: 'text' } as Record<string, unknown>;
    return this.#http.get<string>(location.origin + '/signout', requestOptions);
  }
}
