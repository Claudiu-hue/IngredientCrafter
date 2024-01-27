import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription = new Subscription();
  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    this.userSub = this.registerService.user.subscribe({
      next: (data) => {
        this.isAuthenticated = !data ? false : true;
      },
    });
  }

  onLogout() {
    this.registerService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
