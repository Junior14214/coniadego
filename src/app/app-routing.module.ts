import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HistoricoComponent } from './historico/historico.component';
import { ConsultarMembrosComponent } from './consultar-membros/consultar-membros.component';
import { CadastroMinisterioComponent } from './cadastro-ministerio/cadastro-ministerio.component';
import {ConsultarMinisteriosComponent} from './consultar-ministerios/consultar-ministerios.component';
import {FichaMembroComponent} from "./ficha-membro/ficha-membro.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'consultas/ficha', component: FichaMembroComponent, canActivate: [AuthGuard] },
  { path: 'consultas/ministerios', component: ConsultarMinisteriosComponent, canActivate: [AuthGuard] },
  { path: 'consultas/membros', component: ConsultarMembrosComponent, canActivate: [AuthGuard] },
  { path: 'historico/:id', component: HistoricoComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/membros', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/ministerios', component: CadastroMinisterioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/ministerios/:id', component: CadastroMinisterioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/membros/:id', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
