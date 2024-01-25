import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    this.registerService.user.subscribe({
      next: (data) => {
        this.isAuthenticated = !data ? false : true;
      },
    });
  }

  ngOnDestroy(): void {}
}
