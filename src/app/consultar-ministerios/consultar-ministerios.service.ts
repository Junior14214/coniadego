import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsultarMinisteriosService {

  private urlSituacao = 'http://localhost:3000/situacao';
  private urlMinisterios = 'http://localhost:3000/ministerios';

  constructor(private http: HttpClient) { }

  public getSituacao() {
    return this.http.get(this.urlSituacao, {
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
}
