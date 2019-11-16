import { Cliente } from './../_models/cliente';
import { TokenInterceptor } from './../_helpers/token.interceptor';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class ClienteService {
    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<any>(`${environment.apiUrl}/cliente`).pipe(map(cliente =>
            //cliente.clientes.data
            cliente.clientes
        ));
    }
}