import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaMembroService {

  private invocarFichaSubject = new Subject<void>();

  // Essa é a propriedade que parece estar faltando no seu serviço
  invocarComponenteFichaObservable = this.invocarFichaSubject.asObservable();

  constructor() { }

  invocarEventFicha() {
    this.invocarFichaSubject.next();
  }
}
