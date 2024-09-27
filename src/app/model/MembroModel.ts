import {CargoModel} from "./CargoModel"
import {EnderecoModel} from "./EnderecoModel"
import {HistoricoModel} from "./HistoricoModel"
import {MinisterioModel} from "./MinisterioModel"
import {SituacaoModel} from "./SituacaoModel"

export class MembroModel {

  constructor(
    id?: string,
    rol?: string,
    nome?: string,
    data_nascimento?: string,
    nome_mae?: string,
    nome_pai?: string,
    sexo?: string,
    nacionalidade?: string,
    naturalidade?: string,
    nome_conjuje?: string,
    data_nascimento_conjuje?: string,
    cpf?: string,
    rg?: string,
    email?: string,
    telefone?: string,
    cargo_id?: string,
    estado_civil_id?: string,
    situacao_id?: string,
    endereco_id?: string,
    ministerio_id?: string,
    endereco?: EnderecoModel,
    historico?: Array<HistoricoModel>,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.rol = rol
    this.nome = nome
    this.data_nascimento = data_nascimento
    this.nome_mae = nome_mae
    this.nome_pai = nome_pai
    this.sexo = sexo
    this.nacionalidade = nacionalidade
    this.naturalidade = naturalidade
    this.nome_conjuje = nome_conjuje
    this.data_nascimento_conjuje = data_nascimento_conjuje
    this.cpf = cpf
    this.rg = rg
    this.email = email
    this.telefone = telefone
    this.cargo_id = cargo_id
    this.estado_civil_id = estado_civil_id
    this.situacao_id = situacao_id
    this.endereco_id = endereco_id
    this.ministerio_id = ministerio_id,
      this.endereco = endereco;
    this.historico = historico;
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  id: string;
  rol: string;
  nome: string;
  data_nascimento: string;
  nome_mae: string;
  nome_pai: string;
  sexo: string;
  nacionalidade: string;
  naturalidade: string;
  nome_conjuje: string;
  data_nascimento_conjuje: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  cargo_id: string;
  estado_civil_id: string;
  situacao_id: string;
  endereco_id: string;
  ministerio_id: string;
  endereco: EnderecoModel;
  cargo: CargoModel;
  ministerio: MinisterioModel;
  situacao: SituacaoModel;
  historico: Array<HistoricoModel>;
  createdAt: string;
  updatedAt: string;

}
