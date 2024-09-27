export class CargoModel {

    constructor(
        id?: string,
        nome?: string,
        createdAt?: string,
        updatedAt?: string
    ) {
        this.id = id
        this.nome = nome
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    } 
    
    id: string;
    nome: string;
    createdAt: string;
    updatedAt: string;

}