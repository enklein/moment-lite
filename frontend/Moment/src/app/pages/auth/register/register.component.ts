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

    const { username, email, password } = this.validateForm.value;
    console.log("values check 1", this.validateForm.value);
    console.log("Values check 2", username, email, password)
    this.authService.register(username, email, password).subscribe(
      resData => {
        console.log(resData);
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
  }

  reloadPage(): void {
    window.location.reload();
  }
}
