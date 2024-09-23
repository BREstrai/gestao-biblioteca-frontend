import { Usuario } from './usuario';
import { Livro } from './livro';
import { StatusEnum } from '../enumerations/status';

export class Emprestimo {
    constructor(
        public idEmprestimo: number,
        public usuario: Usuario,
        public livro: Livro,
        public statusEmprestimo: StatusEnum,
        public dhEmprestimo: Date,
        public dhDevolucao?: Date
    ) {}
}