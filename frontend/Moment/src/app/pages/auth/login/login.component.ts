import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    const { username, password } = this.validateForm.value;
    
    this.authService.login(username, password).subscribe(
      resData => {
        this.authService.saveToken(resData.accessToken);
        this.authService.saveUser(resData);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();

        console.log(resData);
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
      }
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
