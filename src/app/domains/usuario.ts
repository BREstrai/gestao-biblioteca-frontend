export class Usuario {
    constructor(
        public idUsuario: number,
        public nome: string,
        public email: string,
        public telefone: string,
        public dhCadastro: Date
    ) {}

    static fromJson(json: { idUsuario: number; nome: string; email: string; telefone: string }): Usuario {
        return new Usuario(
            json.idUsuario,
            json.nome,
            json.email,
            json.telefone,
            new Date()
        );
    }
}