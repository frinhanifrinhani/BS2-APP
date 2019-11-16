import { ClientesComponent } from './clientes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ClientesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],

})
export class ClientesModule { }
