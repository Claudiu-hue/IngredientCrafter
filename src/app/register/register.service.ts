import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from '../shared/interfaces/authResponseData';
import { User } from '../shared/models/user.model';
import { handleError } from '../shared/helpers/authFunctions';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env['API_KEY']}`,
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
          this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      //this is the getter from user model
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - // future time - current time in miliseconds for the expirationDuration
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
