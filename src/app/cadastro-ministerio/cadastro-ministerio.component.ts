import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MinisterioModel} from '../model/MinisterioModel';
import {CadastroMinisterioService} from './cadastro-ministerio.service';
import {SituacaoModel} from "../model/SituacaoModel";
import {MembroModel} from "../model/MembroModel";
import {ConsultaFiltrosModel} from "../model/ConsultaFiltrosModel";
import {AlertService} from "../alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils} from "../utils";

@Component({
  selector: 'app-cadastro-ministerio',
  templateUrl: './cadastro-ministerio.component.html',
  styleUrls: ['./cadastro-ministerio.component.css']
})
export class CadastroMinisterioComponent implements OnInit {

  protected form: FormGroup;
  protected ministerioModel: MinisterioModel = new MinisterioModel(null, null, '', '', '', '', '', null, null, '', new SituacaoModel(), '', '', new MembroModel(), '99.99.9999', '99.99.9999');
  protected situacaoModel: Array<SituacaoModel> = [];
  protected membro: MembroModel;

  constructor(
    private fb: FormBuilder,
    private service: CadastroMinisterioService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private utils: Utils,
    private router: Router) {

    this.buscarSituacao();

    this.route.params.subscribe(param => {
      if (param.id) {
        this.service.buscarMinisterio(param.id).subscribe((res: MinisterioModel) => {
          this.ministerioModel = res;

          console.log(res);

          this.membro = res.membro;

          this.form.patchValue({nome: res.nome});
          this.form.patchValue({membro_id: res.membro.rol});
          this.form.patchValue({pastor: res.membro.nome});
          this.form.patchValue({cnpj: res.cnpj});
          this.form.patchValue({email: res.email});
          this.form.patchValue({filiacao: res.filiacao});
          this.form.patchValue({fundacao: this.utils.formatarData(res.fundacao)});
          this.form.patchValue({ddd: res.ddd});
          this.form.patchValue({telefone: res.telefone});
          this.form.patchValue({endereco: res.endereco});
          this.form.patchValue({situacao_id: res.situacao_id});
          this.form.patchValue({id: res.id});

          //this.iniciarFormulario();
        })
      }
    })

  }

  buscarSituacao() {
    this.service.getSituacao().subscribe((res: Array<SituacaoModel>) => {
      this.situacaoModel = res;
    });
  }

  buscarMembro() {
    const model: ConsultaFiltrosModel = {
      rol: parseInt(this.form.get('membro_id').value, 10),
      nome: "",
      cargo_id: "",
      ministerio_id: "",
      situacao_id: ""
    };

    this.service.buscarMembro(model).subscribe((res: MembroModel) => {
      this.membro = res[0];
      this.form.patchValue({pastor: res[0].nome});
    });
  }

  cadastrar() {

    if (!this.ministerioModel.id) {
      this.novoCadastro();
    } else {
      this.alterarCadastro();
    }

  }

  novoCadastro() {

    this.form.patchValue({id: '-'});

    if (this.form.valid) {
      Object.keys(this.form.controls).forEach(key => {
        if (key === 'membro_id') {
          this.ministerioModel[key] = this.membro.id;
        } else {
          this.ministerioModel[key] = this.form.get(key).value;
        }
      });

      this.service.cadastrarMinisterio(this.ministerioModel).subscribe(res => {
        this.alertService.addAlert('Ministério Cadastrado com Sucesso!', 'alert-success');
        this.form.reset();
      }, error => {
        this.alertService.addAlert(error.error.message, 'alert-danger');
      });

    } else {
      this.alertService.addAlert('Preencha todos os campos Obrigatórios', 'alert-danger');

      const listaErros: string[] = [];
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control.invalid) {
          console.log(`Campo '${key}' é inválido.`);
        }
      });
    }
  }

  alterarCadastro() {
    if (this.form.valid) {
      Object.keys(this.form.controls).forEach(key => {
        if (key === 'membro_id') {
          this.ministerioModel[key] = this.membro.id;
        } else {
          this.ministerioModel[key] = this.form.get(key).value;
        }
      });

      this.service.alterarMinisterio(this.ministerioModel).subscribe(res => {
        this.alertService.addAlert('Ministério Alterado com Sucesso!', 'alert-success');
        this.form.reset();
        this.router.navigate(['/consultas/ministerios']);
      });

    } else {
      this.alertService.addAlert('Preencha todos os campos Obrigatórios', 'alert-danger');
    }
  }

  //Usado somente em desenv caso queira ver qual camp oestá dando erro
  visualizarErrosFormulario() {
    const listaErros: string[] = [];
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control.invalid) {
        console.log(`Campo '${key}' é inválido.`);
      }
    });
  }

  iniciarFormulario() {
    const formControls = {};

    Object.keys(this.ministerioModel).forEach(key => {
      formControls[key] = [this.ministerioModel[key], Validators.required];
    });

    this.form = this.fb.group(formControls);
  }

  ngOnInit() {

    this.iniciarFormulario();

  }


}

