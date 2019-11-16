import { EditaClienteComponent } from './clientes/edita-cliente/edita-cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './login/login.component';
import { CadastraClienteComponent } from './clientes/cadastra-cliente/cadastra-cliente.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'clientes/cadastrar', component: CadastraClienteComponent, canActivate: [AuthGuard] },
  { path: 'clientes/editar/:id', component: EditaClienteComponent, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
