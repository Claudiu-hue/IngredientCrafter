import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from '../shared/interfaces/authResponseData';
import { User } from '../shared/models/user.model';
import { handleError } from '../shared/helpers/authFunctions';
import { RegisterService } from '../register/register.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private http: HttpClient,
    private registerService: RegisterService
  ) {}

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
          this.registerService.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.registerService.autoLogout(+resData.expiresIn * 1000);
        })
      );
  }
}
