import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent {


  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if(form.invalid) { return; }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
