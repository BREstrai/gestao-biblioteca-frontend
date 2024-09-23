import { Component } from '@angular/core';
import { Livro } from '../domains/livro';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LivroService } from './livro.service';
import { NotificacaoService } from '../commons/notificacao.service';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss'
})
export class LivrosComponent {

  dataSource: Livro[] = [];
  
  displayedColumns: string[] = ['titulo', 'autor', 'categoria', 'opcoes'];

  constructor(
    private livroService: LivroService,
    private notificacao: NotificacaoService,
  ) { }

  ngOnInit(): void {

    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livroService.getLivros().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  deletarLivro(id: number): void {
    this.livroService.deleteLivro(id).subscribe({
      next: () => {
        this.carregarLivros();
        this.notificacao.openSnack('Livro deletado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  atualizarLivro(usuario: Livro): void {
    
  }
}
