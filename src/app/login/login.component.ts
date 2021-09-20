import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginRequest } from '../model/login-request';
import { Role } from '../model/role';
import {map} from 'rxjs/operators';
import { UserRoleUtil } from '../_enums/user-role.util';
import { UserRole } from '../_enums/user-role.enum';
import { LoginResponse } from '../model/login-response';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  badCredentials?: boolean;

  private static redirectUser(role: Role): string {
    const userRole=role.name;
    if(userRole==UserRoleUtil.toString(UserRole.ADMIN)){
      return 'new-item'
    } else{
    return '';
    }
  }

  constructor( private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,) { 
      if (this.authService.isLoggedIn()) {
        // this.router.navigate(['/']);
        console.log("logged in")
      }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit(): void {
    console.log("ya aa");
    const loginRequest: LoginRequest = {
      name: this.loginForm!.get('email')!.value,
      password: this.loginForm!.get('password')!.value
    };
    console.log(loginRequest);
    this.authService.login(loginRequest).pipe(

      
      map((loginResponse) => {
        // this.badCredentials = false;
        this.saveUserInformation(loginResponse);
        return loginResponse;
      }),
    ).subscribe(
      (user) => {
        // if (this.authService.hasAnyRole([
        //   UserRoleUtil.toString(UserRole.ROLE_USER)
        // ])) {
        //   this.syncUserCart();
        // }

        const returnUrl = LoginComponent.redirectUser(user.role!);
        this.router.navigateByUrl(returnUrl);
      },
      (error:any)=>{
        this.badCredentials=true;
      }
      
    );
  }

  private saveUserInformation(user: LoginResponse): void {
    this.authService.saveLogin(user.login!);
    this.authService.saveToken(user.token!);
    this.authService.saveUserRole(user.role!);
    this.authService.saveUserId(user.userId!.toString());
    console.log(this.authService.getId());
  }

}
