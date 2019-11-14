﻿import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    authUser() {
        return this.http.get<User[]>(`${environment.apiUrl}/authUser`);
    }
}