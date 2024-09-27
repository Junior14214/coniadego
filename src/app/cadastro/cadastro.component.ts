import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {CadastroService} from './cadastro.service';
import {EnderecoModel} from '../model/EnderecoModel';
import {CargoModel} from '../model/CargoModel';
import {SituacaoModel} from '../model/SituacaoModel';
import {EstadoCvilModel} from '../model/EstadoCivilModel';
import {MembroModel} from '../model/MembroModel';
import {MinisterioModel} from '../model/MinisterioModel';
import {AlertService} from '../alert/alert.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Utils} from '../utils';
import {HistoricoModel} from '../model/HistoricoModel';
import {HistoricoService} from '../historico/historico.service';
import {TipoHistorico} from '../model/TipoHistorico';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private enderecoModel: EnderecoModel = new EnderecoModel();
  private listaCargoModel: Array<CargoModel> = [];
  private listaSituacaoModel: Array<SituacaoModel> = [];
  private listaEstadoCvilModel: Array<EstadoCvilModel> = [];
  private listaMembroModel: MembroModel = new MembroModel();
  private listaMinisteriosModel: Array<MinisterioModel> = [];
  private listaTipoHistorico: Array<TipoHistorico> = [];
  private historico: HistoricoModel = new HistoricoModel(new MembroModel);

  private path: any = '';
  private cargo_id = '';
  private ministerio_id = '';
  private situacao_id = '';
  private observacao = '';
  private foto = '';
  private form: FormGroup;

  private membroModel = new MembroModel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private alert = 1;
  private exibirAba = false;

  constructor(private appComponent: AppComponent, private service: CadastroService, private alertService: AlertService, private route: ActivatedRoute, private utils: Utils, private router: Router
    , private historicoService: HistoricoService, private af: AngularFireStorage, private fb: FormBuilder) {
    appComponent.abaAtiva = 2;

    /**
     * * INICIALIZA OS CAMPOS DE SELECT NO CADASTRO
     */
    this.service.getCargos().subscribe((cargo: Array<CargoModel>) => {
      this.service.getSituacao().subscribe((situacao: Array<SituacaoModel>) => {
        this.service.getEstadoCivil().subscribe((estadoCivil: Array<EstadoCvilModel>) => {
          this.service.getMinisterios().subscribe((ministerios: Array<MinisterioModel>) => {
            this.listaCargoModel = cargo;
            this.listaSituacaoModel = situacao;
            this.listaEstadoCvilModel = estadoCivil;
            this.listaMinisteriosModel = ministerios;
          });
        });
      });
    });

    /**
     * TODO: AO CORRIGIR A GRAVAÇÃO DO HISTÓRICO AO CADASTRAR UM MEMBRO NO BACK END, REMOVER ESSE TRECHO
     * * INICIALIZA A LISTA DE TIPO HISTORICO
     */
    this.historicoService.listarTiporHistorico().subscribe((res: Array<TipoHistorico>) => {
      this.listaTipoHistorico = res;
    });

    /**
     * * VERIFICA SE É UMA CONSULTA E PREENCHE A TELA
     */
    route.params.subscribe(params => {
      if (params.id) {

        this.exibirAba = true;

        this.service.getMembro(params.id).subscribe((res: MembroModel) => {
          this.membroModel = res;
          this.membroModel.data_nascimento = this.utils.formatarData(res.data_nascimento);
          this.membroModel.data_nascimento_conjuje = this.utils.formatarData(res.data_nascimento_conjuje);
          this.membroModel.telefone = utils.formatarTelefone(this.membroModel.telefone);
          this.enderecoModel = res.endereco;
          this.membroModel.cpf = this.utils.formatarCPF(res.cpf);
          this.membroModel.rg = this.utils.formatarRG(res.rg);

          this.cargo_id = this.membroModel.cargo_id;
          this.ministerio_id = this.membroModel.ministerio_id;
          this.situacao_id = this.membroModel.situacao_id;

          const formPreenchido = {...utils.preencheFormMembro(this.membroModel), observacao: this.observacao};

          this.form.setValue(formPreenchido);

          this.getFotoPerfil();
        });
      }

    });


  }

  cadastrar() {

    if (this.form.valid) {

      Object.keys(this.form.controls).forEach(key => {
        this.membroModel[key] = this.form.get(key).value;
      });

      Object.keys(this.form.controls).forEach(key => {
        this.enderecoModel[key] = this.form.get(key).value;
      });


      /**
       * * VERIFICA SE É UMA ALTERAÇÃO OU UM NOVO CADASTRO DE MEMBROS.
       * */
      if (this.membroModel.id) {
        this.filtrarTipoHistorico();
      } else {
        this.cadastrarEndereco();
      }

    } else {
      // Se o formulário não for válido, marque os campos como "touched" para exibir mensagens de erro
      this.markFormGroupTouched(this.form);
      // Exibe um alerta indicando que há campos obrigatórios não preenchidos
      this.alertService.addAlert('Por favor, preencha todos os campos obrigatórios.', 'alert-danger');
    }


  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * * CADASTRA O ENDEREÇO DO MEMBRO NA TABELA
   */
  cadastrarEndereco() {
    this.service.cadastrarEndereco(this.enderecoModel).subscribe((res: EnderecoModel) => {
      this.membroModel.endereco_id = res.id;
      this.cadastrarMembro();
    });
  }

  /**
   * * CADASTRA O MEMBRO NA TABELA
   */
  cadastrarMembro() {
    this.service.cadastrarMembro(this.membroModel).subscribe((res: MembroModel) => {

      /**
       * TODO: AO CORRIGIR A GRAVAÇÃO DO HISTÓRICO AO CADASTRAR UM MEMBRO NO BACK END, REMOVER ESSE TRECHO
       * * VERIFICA SE É UM NOVO CADASTRO E CASO SEJA, GRAVA O HISTÓRICO DO NOVO MEMBRO
       */
      if (!this.membroModel.id) {
        this.historico = new HistoricoModel(res);
        this.historico.observacao = this.form.get('observacao').value ? this.form.get('observacao').value : null;

        this.filtrarTipoHistorico();
        this.uploadImage(res.id);

        this.alertService.addAlert('Membro cadastrado com sucesso!', 'alert-success');
      } else {
        this.alterarFotoPerfil();
        this.alertService.addAlert('Membro alterado com sucesso!', 'alert-success');
        this.router.navigate(['/consultas/membros']);
      }

      this.membroModel = new MembroModel();
      this.enderecoModel = new EnderecoModel();
      this.form.reset();
    });
  }

  async cadastrarHistorico() {
    await this.historicoService.cadastrarHistorico(this.historico).subscribe((res) => {
    });
  }

  /**
   * * FAZ OS TRATAMENTO NECESSÁRIO E SETA AS DESCRIÇÕES PARA O HISTÓRICO
   * @returns void
   */
  async filtrarTipoHistorico() {
    this.membroModel.cpf = this.utils.removeCaracteresNaoNumericos(this.membroModel.cpf);
    this.membroModel.rg = this.utils.removeCaracteresNaoNumericos(this.membroModel.rg);
    this.membroModel.telefone = this.utils.removeCaracteresNaoNumericos(this.membroModel.telefone);

    /**
     * ! FIZ ISSO NA PRESSA, É NECESSÁRIO FAZER ESSE TRATAMENTO E CADASTRAMENTO DO HISTÓRICO NO BACK END AO CHAMAR O CADASTRAMENTO DE MEMBRO
     * TODO: AO CORRIGIR A GRAVAÇÃO DO HISTÓRICO AO CADASTRAR UM MEMBRO NO BACK END, REMOVER ESSE TRECHO
     * * CASO SEJA UMA ALTERAÇÃO FAZ A FILTRAGEM DAS MENSAGENS QUE SERÃO EXIBIDAS NA TELA, CASO SEJAM ALTERADOS AO MESMO TEMPO (CARGO, MINISTÉRIO E ATIVO)
     * * O CAMPO OBSERVAÇÕES SERÁ SETADO PARA TODOS
     */
    if (this.membroModel.id) {
      this.historico = new HistoricoModel(this.membroModel);
      this.historico.observacao = this.form.get('observacao').value ? this.form.get('observacao').value : null;

      if (this.membroModel.cargo_id != this.cargo_id) {
        this.historico.tipo_historico_id = this.getTipoHistorico(2).id;
        this.historico.historico = this.getDescHistorico(2);
        await this.cadastrarHistorico();
      }
      if (this.membroModel.situacao_id != this.situacao_id) {
        const situacao = this.listaSituacaoModel.find(situ => {
          return situ.id == this.situacao_id;
        });

        this.historico.tipo_historico_id = this.getTipoHistorico(situacao.nome == 'Ativo' ? 3 : 4).id;
        this.historico.historico = this.getDescHistorico(situacao.nome == 'Ativo' ? 3 : 4);
        await this.cadastrarHistorico();
      }
      if (this.membroModel.ministerio_id != this.ministerio_id) {
        this.historico.tipo_historico_id = this.getTipoHistorico(6).id;
        this.historico.historico = this.getDescHistorico(6);
        await this.cadastrarHistorico();
      } else {
        /**
         * * CASO NENHUM DOS CAMPOS MINISTÉRIAIS TENHAM SIDO ALTERADOS (CARGO, MINISTÉRIO E ATIVO) SETA O CAMPO OBSERVAÇÕES SEPARADAMENTE NO HISTÓRICO
         */
        if (!this.historico.tipo_historico_id) {
          this.historico.observacao = this.form.get('observacao').value;
          if (this.historico.observacao) {
            this.historico.tipo_historico_id = this.getTipoHistorico(5).id;
            await this.cadastrarHistorico();
          }
        }
      }
    } else {
      /**
       * * CASO SEJA UM NOVO CADASTRO SETA A MENSAGEM NO HISTÓRICO
       */
      this.historico.tipo_historico_id = this.getTipoHistorico(1).id;
      this.historico.historico = this.getDescHistorico(1);
      await this.cadastrarHistorico();
      return;
    }

    this.cadastrarEndereco();
  }

  /**
   * TODO: AO CORRIGIR A GRAVAÇÃO DO HISTÓRICO AO CADASTRAR UM MEMBRO NO BACK END, REMOVER ESSE TRECHO
   * * FILTRA O TIPO DO HISTÓRICO DE ACORDO COM O CÓDIGO
   * @param codigo
   * @returns Array<TipoHistorico>
   */
  getTipoHistorico(codigo) {
    return this.listaTipoHistorico.find((item) => {
      return item.codigo == codigo;
    });
  }

  /**
   * TODO: AO CORRIGIR A GRAVAÇÃO DO HISTÓRICO AO CADASTRAR UM MEMBRO NO BACK END, REMOVER ESSE TRECHO
   * * FILTRA A MENSAGEM QUE SERÁ EXIBIDA NA TELA
   * @param codigo
   * @returns string
   */
  getDescHistorico(codigo) {
    if (codigo == 1) {
      return 'Membro cadastrado no Sistema.';
    }
    if (codigo == 2) {
      return `Membro Consagrado a Pastor`;
    }
    if (codigo == 3) {
      return 'Membro inativado';
    }
    if (codigo == 4) {
      return 'Membro ativado.';
    }
    if (codigo == 6) {
      return 'Membro mudou-se para o ministério Madureira';
    }
  }

  /**
   * * APLICA MÁSCARA DE CPF NA TELA
   */
  applyCpfMask() {
    this.membroModel.cpf = this.utils.formatarCPF(this.membroModel.cpf);
  }

  /**
   * * APLICA MÁSCARA DE RG NA TELA
   */
  applyRgMask() {
    this.membroModel.rg = this.utils.formatarRG(this.membroModel.rg);
  }

  /**
   * * APLICA MÁSCARA DE TELEFONE NA TELA
   */
  applyTelefoneMask() {
    this.membroModel.telefone = this.utils.formatarTelefone(this.membroModel.telefone);
  }

  redirect() {
    this.router.navigate([`/historico/${this.membroModel.id}`]);
  }

  upload($event) {
    this.path = $event.target.files[0];

    if (this.path) {
      // Use FileReader para ler o conteúdo do arquivo como uma URL de dados
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // A 'result' contém a URL de dados que você pode usar para exibir a imagem
        const imageDataUrl: string = e.target.result;
        this.foto = imageDataUrl;

        // Aqui, você pode exibir a imagem, por exemplo, atribuindo a URL a uma variável no seu componente
        // this.imagemPreviewUrl = imageDataUrl;
      };

      // Leitura do arquivo como uma URL de dados
      reader.readAsDataURL(this.path);
    }
  }

  uploadImage(nomeArquivo) {
    if (this.path) {
      this.af.upload(nomeArquivo, this.path)
        .then(res => {
          res.ref.getDownloadURL()
            .then(image => {
              console.log('foi');
            });
        });
    }
  }

  getFotoPerfil() {
    // Referência ao arquivo no Firebase Storage
    const storageRef = this.af.ref(this.membroModel.id);

    // Obter metadados do arquivo
    storageRef.getDownloadURL().subscribe(
      metadata => {
        this.foto = metadata;
      },
      error => {
        console.error('Erro ao obter metadados do arquivo:', error);
      }
    );
  }

  alterarFotoPerfil() {
    if (this.path) {
      // Referência ao arquivo no Firebase Storage
      const storageRef = this.af.ref(this.membroModel.id);

      // Obter metadados do arquivo
      storageRef.put(this.path).then(
        metadata => {
          console.log('Arquivo alterado com sucesso!');
        },
        error => {
          console.error('Erro ao obter metadados do arquivo:', error);
        }
      );
    }
  }

  cadastroAutomatico() {
    const values = {
      nome: '',
      data_nascimento: '',
      nome_mae: 'Atualizar',
      nome_pai: 'Atualizar',
      sexo: '',
      nacionalidade: 'Atualizar',
      naturalidade: 'Atualizar',
      nome_conjuje: 'Atualizar',
      data_nascimento_conjuje: '1999-01-01',
      cpf: '000.000.000-00',
      rg: '0.000.000',
      email: 'Atualizar',
      telefone: '(00)00000-0000',
      cargo_id: '',
      estado_civil_id: '',
      situacao_id: '',
      ministerio_id: '',
      cep: '000',
      endereco: 'Atualizar',
      numero: '999',
      complemento: 'Atualizar',
      observacao: 'Membro cadastrado através do cadastro rápido, necessária a atualização do cadastro o mais breve possível.'
    };

    this.form.setValue(values);
  }

  cadastroRapido() {
    const values = {
      nome_mae: 'Atualizar',
      nome_pai: 'Atualizar',
      nacionalidade: 'Atualizar',
      naturalidade: 'Atualizar',
      nome_conjuje: 'Atualizar',
      data_nascimento_conjuje: '2023-01-01',
      cpf: 'Atualizar',
      rg: 'Atualizar',
      email: 'Atualizar',
      telefone: 'Atualizar',
      cep: '123',
      endereco: 'Atualizar',
      numero: '123',
      complemento: 'Atualizar'
    };

    this.form.setValue(values);
  }

  ngOnInit() {
    const formControls = {};

    Object.keys(this.membroModel).forEach(key => {
      if (key != 'id' && key != 'rol' && key != 'endereco' && key != 'historico' && key != 'createdAt' && key != 'updatedAt' && key != 'endereco_id') {
        formControls[key] = [this.membroModel[key], Validators.required];

      }
    });

    Object.keys(this.enderecoModel).forEach(key => {
      if (key != 'id' && key != 'createdAt' && key != 'updatedAt') {
        formControls[key] = [this.enderecoModel[key], Validators.required];

      }
    });

    // @ts-ignore
    formControls.observacao = [this.observacao];

    // Crie o formulário usando o FormBuilder
    this.form = this.fb.group(formControls);

  }

}
