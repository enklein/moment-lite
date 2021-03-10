import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const { username, email, password } = this.validateForm.value;
    this.authService.register(username, email, password).subscribe(
      resData => {
        this.authService.saveToken(resData.accessToken);
        this.authService.saveUser(resData);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error => {
        console.log(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
