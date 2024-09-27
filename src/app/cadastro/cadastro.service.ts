import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnderecoModel } from '../model/EnderecoModel';
import { MembroModel } from '../model/MembroModel';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private urlEndereco: string = 'http://localhost:3000/endereco';
  private urlCargo: string = 'http://localhost:3000/cargo';
  private urlSituacao: string = 'http://localhost:3000/situacao';
  private urlEstadoCivil: string = 'http://localhost:3000/estadoCivil';
  private urlMinisterios: string = 'http://localhost:3000/ministerios';
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

public cadastrarMembro(dto: MembroModel) {
  return this.http.post(this.urlMembros, dto, {
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


}
