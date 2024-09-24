import { Component } from '@angular/core';
import { Livro } from '../../domains/livro';
import { Usuario } from '../../domains/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Emprestimo } from '../../domains/emprestimo';
import { LivroService } from '../../livros/livro.service';
import { UsuarioService } from '../../usuarios/usuario.service';
import { EmprestimoService } from '../emprestimo.service';
import { StatusEnum } from '../../enumerations/status';
import { NotificacaoService } from '../../commons/notificacao.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprestar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
  ],
  templateUrl: './emprestar.component.html',
  styleUrl: './emprestar.component.scss'
})
export class EmprestarComponent {
  emprestimoForm: FormGroup;
  usuarios: Usuario[] = [];
  livros: Livro[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private livroService: LivroService,
    private emprestimoService: EmprestimoService,
    private notificacao: NotificacaoService,
  ) {

    this.carregarUsuarios();
    this.carregarLivros();

    this.emprestimoForm = this.fb.group({
      idUsuario: [null, Validators.required],
      idLivro: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  private carregarUsuarios() {

    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    }, error => {
      this.notificacao.openSnack(error.error.message);
    });
  }

  private carregarLivros() {

    this.livroService.getLivros().subscribe((livros: Livro[]) => {
      this.livros = livros;
    }, error => {
      this.notificacao.openSnack(error.error.message);
    });
  }

  salvar(): void {
    const usuarioJson = this.usuarios.find(u => u.idUsuario === this.emprestimoForm.value.idUsuario);
    const livroJson = this.livros.find(l => l.idLivro === this.emprestimoForm.value.idLivro);

    if (usuarioJson && livroJson) {
      const usuario = Usuario.fromJson(usuarioJson);
      const livro = Livro.fromJson(livroJson);
      const dhEmprestimo = this.emprestimoForm.value.dhEmprestimo;

      const emprestimo = new Emprestimo(0, usuario, livro, StatusEnum.EMPRESTADO, dhEmprestimo);

      this.realizarEmprestimo(emprestimo);

      return;
    }

    this.notificacao.openSnack("Não foram informadas todas as partes do empréstimo.");
  }

  realizarEmprestimo(emprestimo: Emprestimo) {

    const livro = emprestimo.livro;
    const categoria = livro.categoria.valor

    const emprestimoRequest = {      
      usuario: emprestimo.usuario,
      livro: {
        idLivro: livro.idLivro,
        titulo: livro.titulo,
        autor: livro.autor,
        isbn: livro.isbn,
        categoria: categoria,
        dhPublicacao: livro.dhPublicacao
      }
    };

    this.emprestimoService.emprestar(emprestimoRequest).subscribe({
      next: () => {
        this.router.navigate(['/emprestimo']);
        this.notificacao.openSnack('Empréstimo realizado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }
}
