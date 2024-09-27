import { EnderecoModel } from "./EnderecoModel";
import { MembroModel } from "./MembroModel";

export class HistoricoModel {
    constructor(model: MembroModel) {
        this.id = model.id
        this.membro_id = model.id,
        this.rol = model.rol
        this.nome = model.nome
        this.data_nascimento = model.data_nascimento
        this.nome_mae = model.nome_mae
        this.nome_pai = model.nome_pai
        this.sexo = model.sexo
        this.nacionalidade = model.nacionalidade
        this.naturalidade = model.naturalidade
        this.nome_conjuje = model.nome_conjuje
        this.data_nascimento_conjuje = model.data_nascimento_conjuje
        this.cpf = model.cpf
        this.rg = model.rg
        this.email = model.email
        this.telefone = model.telefone
        this.cargo_id = model.cargo_id
        this.estado_civil_id = model.estado_civil_id
        this.situacao_id = model.situacao_id
        this.endereco_id = model.endereco_id
        this.ministerio_id = model.ministerio_id
    } 
    
    id: string;
    membro_id: string;
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
    tipo_historico_id: string;
    responsavel_alteracao: string;
    historico: string;
    observacao: string;
    createdAt: string;
    updatedAt: string;
}