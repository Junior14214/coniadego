export class TipoHistorico {
    constructor(
        id?: string,
        nome?: string,
        codigo?: number,
        createdAt?: string,
        updatedAt?: string
    ) {
        this.id = id
        this.nome = nome
        this.codigo = codigo
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    } 
    
    id: string;
    nome: string;
    codigo: number;
    createdAt: string;
    updatedAt: string;
}