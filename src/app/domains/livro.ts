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
}