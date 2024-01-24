import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from '../shared/interfaces/authResponseData';
import { User } from '../shared/models/user.model';
import { handleError } from '../shared/helpers/authFunctions';

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env['API_KEY']}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(handleError),
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
        })
      );
  }
}
