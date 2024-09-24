import { Usuario } from './usuario';
import { Livro } from './livro';
import { StatusEnum } from '../enumerations/status';
import { CategoriaEnum } from '../enumerations/categoria';

export class Emprestimo {
    constructor(
        public idEmprestimo: number,
        public usuario: Usuario,
        public livro: Livro,
        public statusEmprestimo: StatusEnum,
        public dhEmprestimo: Date,
        public dhDevolucao?: Date
    ) {}

    constructorFromJson(json: { usuario: Usuario; livro: Livro; }) {
        this.usuario = new Usuario(
            json.usuario.idUsuario,
            json.usuario.nome,
            json.usuario.email,
            json.usuario.telefone,
            new Date()
        );

        const categoriaValor = json.livro.categoria.valor

        this.livro = new Livro(
            json.livro.idLivro,
            json.livro.titulo,
            json.livro.autor,
            json.livro.isbn,
            CategoriaEnum[categoriaValor],
            new Date()
        );
    }
}