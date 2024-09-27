import {Component, OnInit} from '@angular/core';
import {ConsultarMinisteriosService} from "./consultar-ministerios.service";
import {SituacaoModel} from "../model/SituacaoModel";
import {ConsultaFiltrosModel} from "../model/ConsultaFiltrosModel";
import {MinisterioModel} from "../model/MinisterioModel";
import {Router} from "@angular/router";
import {MembroModel} from "../model/MembroModel";

@Component({
  selector: 'app-consultar-ministerios',
  templateUrl: './consultar-ministerios.component.html',
  styleUrls: ['./consultar-ministerios.component.css']
})
export class ConsultarMinisteriosComponent implements OnInit {

  protected listaSituacao: Array<SituacaoModel>;
  protected pesquisa: ConsultaFiltrosModel = {
    rol: null,
    nome: '',
    cargo_id: '',
    ministerio_id: '',
    situacao_id: ''
  };
  protected listaMinisterios: Array<MinisterioModel>;
  protected listaMinisteriosFiltro: Array<MinisterioModel>;

  constructor(private service: ConsultarMinisteriosService, private router: Router) {
    this.getSituacao();
    this.getMinisterios();
  }

  ngOnInit() {
  }

  getMinisterios() {
    this.service.getMinisterios().subscribe((res: Array<MinisterioModel>) => {
      this.listaMinisterios = res;
      this.listaMinisteriosFiltro = res;
      console.log(res);
    })
  }

  getSituacao() {
    this.service.getSituacao().subscribe((res: Array<SituacaoModel>) => {
      this.listaSituacao = res;
    });
  }

  pesquisar() {
    this.listaMinisterios = this.listaMinisteriosFiltro.filter(item => {
      return item.situacao_id === this.pesquisa.situacao_id;
    });
  }

  limpar() {
    this.listaMinisterios = this.listaMinisteriosFiltro.slice(0);
    this.pesquisa.situacao_id = '';
  }

  editarMinisterio(id){
    this.router.navigate([`/cadastro/ministerios/${id}`]);
  }

}
