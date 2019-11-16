import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuscaCep {
    constructor(private http: HttpClient) { }

    buscaCep(cep: string) {
        cep = cep.replace(/\D/g, '');

        if (cep !== '') {
            const validaCep = /^[0-9]{8}$/;

            if (validaCep.test(cep)) {

                return new Observable((x) => {
                    var request = new XMLHttpRequest();
                    request.open('get', `http://viacep.com.br/ws/${cep}/json`, true);
                    request.send();
                    request.onload = function () {
                        var data = JSON.parse(this.response);
                        x.next(data)
                    }
                })
            }
        }

        return of({});
    }

}