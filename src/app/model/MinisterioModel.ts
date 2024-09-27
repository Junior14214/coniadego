import {MembroModel} from "./MembroModel";
import {SituacaoModel} from "./SituacaoModel";

export class MinisterioModel {

  constructor(
    id?: string,
    cnpj?: number,
    email?: string,
    filiacao?: string,
    fundacao?: string,
    nome?: string,
    pastor?: string,
    ddd?: number,
    telefone?: number,
    situacao_id?: string,
    situacao?: SituacaoModel,
    endereco?: string,
    membro_id?: string,
    membro?: MembroModel,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.cnpj = cnpj;
    this.email = email;
    this.filiacao = filiacao;
    this.fundacao = fundacao;
    this.nome = nome;
    this.pastor = pastor;
    this.ddd = ddd;
    this.telefone = telefone;
    this.situacao_id = situacao_id;
    this.situacao = situacao;
    this.endereco = endereco;
    this.membro_id = membro_id;
    this.membro = membro;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: string;
  cnpj: number;
  email: string;
  filiacao: string;
  fundacao: string;
  nome: string;
  pastor: string;
  ddd: number;
  telefone: number;
  situacao_id: string;
  situacao: SituacaoModel;
  endereco: string;
  membro_id: string;
  membro: MembroModel;
  createdAt: string;
  updatedAt: string;

}
