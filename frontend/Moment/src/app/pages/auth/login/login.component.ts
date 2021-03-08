import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private tokenStorage: TokenStorageService) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    const { username, password } = this.validateForm.value;
    
    this.authService.login(username, password).subscribe(
      resData => {
        this.tokenStorage.saveToken(resData.accessToken);
        this.tokenStorage.saveUser(resData);

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

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
