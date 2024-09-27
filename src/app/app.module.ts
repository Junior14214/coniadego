import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { Utils } from './utils';
import { HistoricoComponent } from './historico/historico.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { ConsultarMembrosComponent } from './consultar-membros/consultar-membros.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CadastroMinisterioComponent } from './cadastro-ministerio/cadastro-ministerio.component';
import { ConsultarMinisteriosComponent } from './consultar-ministerios/consultar-ministerios.component';
import { CadastroAnuidadeComponent } from './cadastro-anuidade/cadastro-anuidade.component';
import {FichaMembroComponent} from "./ficha-membro/ficha-membro.component";


// Adicione esta classe em seu arquivo
class NullViewportScroller implements ViewportScroller {
  setOffset(offset: [number, number] | (() => [number, number])): void {
    throw new Error('Method not implemented.');
  }
  getScrollPosition(): [number, number] {
    throw new Error('Method not implemented.');
  }
  scrollToPosition(position: [number, number]): void {
    throw new Error('Method not implemented.');
  }
  scrollToAnchor(anchor: string): void {
    throw new Error('Method not implemented.');
  }
  setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void {
    throw new Error('Method not implemented.');
  }

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    AlertComponent,
    HistoricoComponent,
    ConsultarMembrosComponent,
    BreadcrumbComponent,
    CadastroMinisterioComponent,
    ConsultarMinisteriosComponent,
    CadastroAnuidadeComponent,
    FichaMembroComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule
    ],
  providers: [
    AlertService,
    Utils,
    { provide: ViewportScroller, useClass: NullViewportScroller },
    FormBuilder
  ],
  bootstrap: [AppComponent, AlertComponent]
})
export class AppModule { }
