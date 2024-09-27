import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ConsultarMembrosService } from './consultar-membros.service';
import { MembroModel } from '../model/MembroModel';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';
import { MinisterioModel } from '../model/MinisterioModel';
import { CargoModel } from '../model/CargoModel';
import { SituacaoModel } from '../model/SituacaoModel';
import { ConsultaFiltrosModel } from '../model/ConsultaFiltrosModel';
import { HttpErrorResponse } from '@angular/common/http';
import {FichaMembroService} from "../ficha-membro/ficha-membro.service";

@Component({
  selector: 'app-consultar-membros',
  templateUrl: './consultar-membros.component.html',
  styleUrls: ['./consultar-membros.component.css']
})
export class ConsultarMembrosComponent implements OnInit {

  protected membroModel: Array<MembroModel> = [];
  private listaMinisterios: Array<MinisterioModel> = [];
  private listaCargos: Array<CargoModel> = [];
  private listaSituacao: Array<SituacaoModel> = [];
  private pesquisa: ConsultaFiltrosModel = {
    rol: null,
    nome: "",
    cargo_id: "",
    ministerio_id: "",
    situacao_id: ""
  }

  private tipoPesquisa: number = 1;

  membroSelecionado: MembroModel = new MembroModel();

  constructor(private appComponent: AppComponent, private service: ConsultarMembrosService, private alertService: AlertService, private router: Router, private fichaMembroService: FichaMembroService) {
    this.appComponent.abaAtiva = 4

    this.service.getMembros().subscribe((res: Array<MembroModel>)=>{
      this.membroModel = res;
    })

    this.service.getMinisterios().subscribe((res: Array<MinisterioModel>) =>{
      this.listaMinisterios = res;
    })

    this.service.getCargos().subscribe((res: Array<CargoModel>) =>{
      this.listaCargos = res;
    })

    this.service.getSituacao().subscribe((res: Array<SituacaoModel>) =>{
      this.listaSituacao = res;
    })
  }

  editarMembro(id){
    this.router.navigate([`/cadastro/membros/${id}`]);
  }

  historico(id){
    this.router.navigate([`/historico/${id}`]);
  }

  pesquisar(){
    this.service.getMembrosFiltros(this.pesquisa).subscribe((res: Array<MembroModel>)=>{
      this.membroModel = res;
    }, (error: HttpErrorResponse) =>{
      this.alertService.addAlert(error.error.message, 'alert-danger');
      this.membroModel = [];
    });
  }

  limpar(){

    this.pesquisa = {
      rol: null,
      nome: "",
      cargo_id: "",
      ministerio_id: "",
      situacao_id: ""
    };

    this.pesquisar();
  }

  baixarFicha(){
    this.fichaMembroService.invocarEventFicha();
  }

  selecionarMembro(membro: MembroModel){
    console.log('aaaaaaaaaaaaaa', membro);
    this.membroSelecionado = membro
  }

  ngOnInit() {
  }

}
