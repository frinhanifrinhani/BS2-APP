import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { ClienteService } from '../_services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;
  clienteService: ClienteService;
  error = '';
  messageOk: boolean = false;
  modalOptions: NgbModalOptions;
  closeResult: string;
  config: any;
  collection = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    clienteService: ClienteService,
    private modalService: NgbModal

  ) {
    this.clienteService = clienteService;

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
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

  open(content, id) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `${this.deleteCliente(id)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'backdrop';
    } else {
      return `${reason}`;
    }
  }

  deleteCliente(id) {
    this.clienteService.deleteCliente(id)
      .subscribe( res => {
        this.messageOk = true;

        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      errorResponse => {
        this.error = errorResponse.errors
      }
    );
  }
}