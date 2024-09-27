import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaFiltrosModel } from '../model/ConsultaFiltrosModel';

@Injectable({
  providedIn: 'root'
})
export class ConsultarMembrosService {

  private urlMembros: string = 'http://localhost:3000/membros';
  private urlMinisterios: string = 'http://localhost:3000/ministerios';
  private urlCargo: string = 'http://localhost:3000/cargo';
  private urlSituacao: string = 'http://localhost:3000/situacao';
   private urlMembrosFiltros: string = 'http://localhost:3000/membrosFiltros';

  constructor(private http: HttpClient) { }

  public getMembros(){
    return this.http.get(this.urlMembros, {
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

public getMembrosFiltros(model: ConsultaFiltrosModel) {
  return this.http.post(this.urlMembrosFiltros, model, {
      headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
  });
}
}
