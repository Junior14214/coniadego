import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnderecoModel } from '../model/EnderecoModel';
import { MembroModel } from '../model/MembroModel';
import { HistoricoModel } from '../model/HistoricoModel';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private urlHistorico: string = 'http://localhost:3000/historico';
  private urlTipoHistorico: string = 'http://localhost:3000/tipoHistorico';


  constructor(private http: HttpClient) { }

public cadastrarHistorico(dto:HistoricoModel){
    return this.http.post(this.urlHistorico, dto, {
        headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
    });
}

public listarTiporHistorico(){
    return this.http.get(this.urlTipoHistorico, {
        headers: new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
    });
}


}
