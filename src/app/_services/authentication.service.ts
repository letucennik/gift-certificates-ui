import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable, throwError } from 'rxjs';
import { SignUpRequest } from '../model/signup-request';
import { User } from '../model/user';
import { Role } from '../model/role';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl: string;
  private signupUrl: string;
  private TOKEN_KEY = 'auth-token';
  private LOGIN_KEY = 'user-login';
  private ROLE_KEY = 'user-role';
  private ID_KEY = "user-id";
  public static LOGIN_FAILED: boolean = false;

  constructor(
    private httpClient: HttpClient,) {
    this.loginUrl = environment.apiUrl + '/users/log_in';
    this.signupUrl = environment.apiUrl + '/users/sign_up';
  }

  signUp(signUpRequest: LoginRequest): Observable<User> {
    return this.httpClient.post<User>(this.signupUrl, signUpRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, loginRequest);
  }

  public saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveLogin(login: string): void {
    localStorage.removeItem(this.LOGIN_KEY);
    localStorage.setItem(this.LOGIN_KEY, login);
  }
  public saveUserId(id: string): void {
    localStorage.removeItem(this.ID_KEY);
    localStorage.setItem(this.ID_KEY, id);
  }

  public getLogin(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getId(): string | null {
    console.log("ya dolzhen rabotac" + localStorage.getItem(this.ID_KEY));
    return localStorage.getItem(this.ID_KEY);
  }

  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  public saveUserRole(roles: Role): void {
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.setItem(this.ROLE_KEY, JSON.stringify(roles));
  }

  public hasRole(role: string): boolean {
    role = JSON.stringify(role);
    if (!role) {
      throw new Error('Role value is empty or missed');
    }
    const userRoleName = this.getUserRole();
    return userRoleName == role;
  }

  public getUserRole(): string {
    const role = localStorage.getItem(this.ROLE_KEY);
    return role!;
  }

  public logout(): void {
    localStorage.clear();
  }


}