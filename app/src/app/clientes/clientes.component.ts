import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { ClienteService } from '../_services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;
  clienteService: ClienteService;
  error = '';

  config: any;
  collection = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    clienteService: ClienteService
  ) {
    this.clienteService = clienteService;
  }

  ngOnInit() {
    this.getClientes()
  }

  getClientes() {
    this.clienteService.getClientes()
      .subscribe(
        data => {
          this.clientes = data;
        }, errorResponse => {
          this.error = errorResponse;
        }
      )
  }
}