import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro/cadastro.service';
import { EnderecoModel } from '../model/EnderecoModel';
import { CargoModel } from '../model/CargoModel';
import { SituacaoModel } from '../model/SituacaoModel';
import { EstadoCvilModel } from '../model/EstadoCivilModel';
import { MembroModel } from '../model/MembroModel';
import { MinisterioModel } from '../model/MinisterioModel';
import { Utils } from '../utils';
import { HistoricoModel } from '../model/HistoricoModel';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  private enderecoModel: EnderecoModel = new EnderecoModel();
  private listaCargoModel: Array<CargoModel> = [];
  private listaSituacaoModel: Array<SituacaoModel> = [];
  private listaEstadoCvilModel: Array<EstadoCvilModel> = [];
  private listaMembroModel: MembroModel = new MembroModel();
  private listaMinisteriosModel: Array<MinisterioModel> = []
  private membroModel = new MembroModel("","","","","","","","","","","","","","","","","","","","",new EnderecoModel(),new Array<HistoricoModel>(),"",);
  private alert: number = 1;

  constructor(private route: ActivatedRoute, private service: CadastroService, private utils: Utils, private router:Router) { 

    /**
     * * INICIALIZA A TELA DE HISTÓRICO
     */
    route.params.subscribe(params => {
      if (params['id']) {
        this.service.getMembro(params['id']).subscribe((res: MembroModel) => {
          this.membroModel = res;
          this.membroModel.data_nascimento = this.utils.formatarData(res.data_nascimento);
          this.membroModel.data_nascimento_conjuje = this.utils.formatarData(res.data_nascimento_conjuje);
          this.membroModel.telefone = utils.formatarTelefone(this.membroModel.telefone);
          this.enderecoModel = res.endereco;
          this.membroModel.cpf = this.utils.formatarCPF(res.cpf);
          this.membroModel.rg = this.utils.formatarRG(res.rg);
          this.membroModel.historico.map((item)=>{
            item.createdAt = utils.formatarDataDoBancoDeDados(item.createdAt);
          })
        })
      }
    })

  }

  redirect(){
    this.router.navigate([`/cadastro/membros/${this.membroModel.id}`])
  }

  ngOnInit() {
  }

}
