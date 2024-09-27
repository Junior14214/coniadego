export class EnderecoModel {

    constructor(
        id?: string,
        cep?: number,
        endereco?: string,
        numero?: number,
        complemento?: string
    ) {
        this.id = id
        this.cep = cep
        this.endereco = endereco
        this.numero = numero
        this.complemento = complemento
    }

    id: string;
    cep: number;
    endereco: string;
    numero: number;
    complemento: string;

}