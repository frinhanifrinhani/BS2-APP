import { Cliente } from './../_models/cliente';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<any>(`${environment.apiUrl}/cliente`).pipe(map(cliente =>
            cliente.clientes
        ));
    }

    getCliente(id): Observable<Cliente[]> {
        return this.http.get<any>(`${environment.apiUrl}/cliente/${id}`).pipe(map(cliente =>
            cliente.cliente[0]
        ));
    }

    cadastrarCliente(data): Observable<Cliente> {
        return this.http.post<Cliente>(`${environment.apiUrl}/cliente/cadastrar`,
            JSON.stringify(data))
            .pipe(map(cliente =>
                cliente
            ));
    }

    editarCliente(data, id): Observable<Cliente> {
        return this.http.put<Cliente>(`${environment.apiUrl}/cliente/atualizar/${id}`,
            JSON.stringify(data))
            .pipe(map(cliente =>
                cliente
            ));
    }

    deleteCliente(id) {
        return this.http.delete<Cliente>(`${environment.apiUrl}/cliente/excluir/${id}`)
            .pipe(map(cliente =>
                cliente
            ));
    }

}