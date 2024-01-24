import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private registerService: RegisterService) {}

  onSubmit(form: NgForm) {
    if (!form) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.registerService
      .signUp(email, password)
      .subscribe({ complete: console.info });

    form.reset();
  }
}
