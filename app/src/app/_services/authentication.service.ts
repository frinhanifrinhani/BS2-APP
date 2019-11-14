import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User } from './../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  mostrarMenuEmiter = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('user', (JSON.stringify(user)));
        this.mostrarMenuEmiter.emit(true);
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.mostrarMenuEmiter.emit(false);
    this.currentUserSubject.next(null);
  }

  

}
