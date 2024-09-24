import { Component } from '@angular/core';
import { Emprestimo } from '../domains/emprestimo';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { EmprestimoService } from './emprestimo.service';
import { NotificacaoService } from '../commons/notificacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emprestimos',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.scss'
})
export class EmprestimosComponent {

  dataSource: Emprestimo[] = [];
  
  displayedColumns: string[] = ['usuario', 'livro', 'dhEmprestimo', 'dhDevolucao', 'opcoes'];

  constructor(
    private emprestimoService: EmprestimoService,
    private notificacao: NotificacaoService,
  ) { }

  ngOnInit(): void {

    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {
    
    this.emprestimoService.getEmprestimos().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  devolver(emprestimo: Emprestimo): void {

    this.emprestimoService.devovler(emprestimo.idEmprestimo).subscribe({
      next: (data) => {
        this.carregarEmprestimos();
        this.notificacao.openSnack('Devolução realizada com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }
}
