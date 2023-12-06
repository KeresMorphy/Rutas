import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API: string = env.API;
  isLogged: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(employee_number: any, password: any) {
    return this.http.post(this.URL_API + 'sellers/login', {
      "employee_number": employee_number,
      "password": password
    });
  }

  logout() {
    return this.http.get(this.URL_API + 'sellers/logout');
  }

  tokenRefresh() {
    return this.http.get(this.URL_API + 'sellers/refresh');
  }

}
