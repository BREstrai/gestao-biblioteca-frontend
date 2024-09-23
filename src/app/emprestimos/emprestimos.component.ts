import { Component } from '@angular/core';
import { Emprestimo } from '../domains/emprestimo';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmprestimoService } from './emprestimo.service';
import { NotificacaoService } from '../commons/notificacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emprestimos',
  standalone: true,
  imports: [
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
  
  displayedColumns: string[] = ['usuario', 'livro', 'dhEmprestimo'];

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
}
