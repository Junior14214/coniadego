export class ConsultaFiltrosModel {
    constructor(
        rol?: number,
        nome?: string,
        cargo_id?: string,
        ministerio_id?: string,
        situacao_id?: string
    ){
        this.rol = rol;
        this.nome = nome ? nome : "";
        this.cargo_id = cargo_id;
        this.ministerio_id = ministerio_id;
        this.situacao_id = situacao_id;
    }

    rol: number;
    nome: string;
    cargo_id: string;
    ministerio_id: string;
    situacao_id: string;
}