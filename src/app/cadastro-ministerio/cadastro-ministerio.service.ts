import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnderecoModel } from '../model/EnderecoModel';
import { MembroModel } from '../model/MembroModel';
import {ConsultaFiltrosModel} from "../model/ConsultaFiltrosModel";
import {MinisterioModel} from "../model/MinisterioModel";

@Injectable({
  providedIn: 'root'
})
export class CadastroMinisterioService {

  private urlEndereco: string = 'http://localhost:3000/endereco';
  private urlCargo: string = 'http://localhost:3000/cargo';
  private urlEstadoCivil: string = 'http://localhost:3000/estadoCivil';
  private urlMinisterios: string = 'http://localhost:3000/ministerios';

  private urlCadastrarMinisterio: string = 'http://localhost:3000/ministerios';
  private urlAlterararMinisterio: string = 'http://localhost:3000/ministerios';
  private urlBuscarMinisterio: string = 'http://localhost:3000/ministerios';
  private urlSituacao: string = 'http://localhost:3000/situacao';
  private urlMembrosFiltros: string = 'http://localhost:3000/membrosFiltros';
  private urlMembros: string = 'http://localhost:3000/membros';


  constructor(private http: HttpClient) { }

  public cadastrarEndereco(dto: EnderecoModel) {
    return this.http.post(this.urlEndereco, dto, {
        headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
    });
}

public getCargos() {
  return this.http.get(this.urlCargo, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

public getSituacao() {
  return this.http.get(this.urlSituacao, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

public getEstadoCivil() {
  return this.http.get(this.urlEstadoCivil, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

public getMinisterios() {
  return this.http.get(this.urlMinisterios, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

public cadastrarMinisterio(dto: MinisterioModel) {
  return this.http.post(this.urlCadastrarMinisterio, dto, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

public getMembro(id: string) {
  return this.http.get(`${this.urlMembros}/id/${id}`, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}

  public buscarMembro(model: ConsultaFiltrosModel) {
    return this.http.post(this.urlMembrosFiltros, model, {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    });
  }

  public buscarMinisterio(id: string) {
    return this.http.get(`${this.urlBuscarMinisterio}/id/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    });
  }

  public alterarMinisterio(model: MinisterioModel) {
    return this.http.put(`${this.urlAlterararMinisterio}/id/${model.id}`  , model, {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    });
  }


}
