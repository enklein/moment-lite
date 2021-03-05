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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // if (!this.validateForm.valid) {
    //   return;
    // }
    
    const username = this.validateForm.value.userName;
    const password = this.validateForm.value.password;
    
    this.authService.login(username, password).subscribe(
      resData => {
        console.log(resData);
      },
      error => {
        console.log(error);
      }
    );

    // this.validateForm.reset();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
}
