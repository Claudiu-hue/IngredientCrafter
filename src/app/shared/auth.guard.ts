import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RegisterService } from '../register/register.service';
import { Observable, map, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private registerService: RegisterService,
    private route: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.registerService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          this.route.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
