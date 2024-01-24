import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!error.error || !error.error.error) {
    return throwError(() => errorMessage);
  }
  switch (error.error.error.message) {
    case 'EMAIL_EXISTS': {
      errorMessage = 'This email already exists!';
      break;
    }
    case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
      errorMessage = 'To many attepts, try latter!';
      break;
    }
    case 'INVALID_LOGIN_CREDENTIALS': {
      errorMessage = 'Invalid login credentials!';
      break;
    }
    case 'USER_DISABLED': {
      errorMessage = 'User disabled!';
      break;
    }
  }
  return throwError(() => errorMessage);
}
