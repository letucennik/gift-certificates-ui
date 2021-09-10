import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { SignUpRequest } from '../model/signup-request';
import { PasswordValidation } from './password-confirm';
import { LoginRequest } from '../model/login-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm?: FormGroup;
  badCredentials?: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmit(): void {
    const signUpRequest: LoginRequest = {
      name: this.signUpForm!.get('name')!.value,
      password: this.signUpForm!.get('password')!.value
    };
    this.authService.signUp(signUpRequest).subscribe(data => {
      this.redirectToLoginPage();
    }, error => {
      console.log(error);
      this.badCredentials = true;
    });
  }

  redirectToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }

}
