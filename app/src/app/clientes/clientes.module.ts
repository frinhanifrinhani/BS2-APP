import { ClientesComponent } from './clientes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastraClienteComponent } from './cadastra-cliente/cadastra-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditaClienteComponent } from './edita-cliente/edita-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ClientesComponent,
    CadastraClienteComponent,
    EditaClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule

  ],
  
})
export class ClientesModule { }
