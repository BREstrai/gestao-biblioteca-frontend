import { CategoriaEnum } from "../enumerations/categoria";

export class Livro {
    constructor(
        public idLivro: number,
        public titulo: string,
        public autor: string,
        public isbn: string,
        public categoria: CategoriaEnum,
        public dhPublicacao: Date
    ) {}

    static fromJson(json: { idLivro: number; titulo: string; autor: string; isbn: string }): Livro {
        return new Livro(
            json.idLivro,
            json.titulo,
            json.autor,
            json.isbn,
            CategoriaEnum.FICCAO,
            new Date()
        );
    }
}