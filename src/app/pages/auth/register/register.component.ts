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
    const email = this.validateForm.value.email;
    const password = this.validateForm.value.password;

    this.authService.register(username, email, password).subscribe(
      resData => {
        console.log(resData);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    });
  }
}
