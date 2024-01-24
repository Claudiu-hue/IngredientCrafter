import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;
  error: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit(form: NgForm) {
    if (!form) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.loginService.signIn(email, password).subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
  }
}
