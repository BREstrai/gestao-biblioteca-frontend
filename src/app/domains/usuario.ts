export class Usuario {
    constructor(
        public idUsuario: number,
        public nome: string,
        public email: string,
        public telefone: string,
        public dhCadastro: Date
    ) {}
}