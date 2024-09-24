import { Component } from '@angular/core';
import { EmprestimoService } from '../emprestimo.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NotificacaoService } from '../../commons/notificacao.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../domains/usuario';
import { Livro } from '../../domains/livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sugerir',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './sugerir.component.html',
  styleUrl: './sugerir.component.scss'
})
export class SugerirComponent {
  usuario: Usuario | null = null;

  dataSource: Livro[] = [];

  displayedColumns: string[] = ['titulo', 'autor', 'categoria'];

  constructor(
    private router: Router,
    private emprestimoService: EmprestimoService,
    private notificacao: NotificacaoService,
  ) { 

    const navigation = this.router.getCurrentNavigation();

    console.log(navigation);

    this.usuario = navigation?.extras?.state?.['usuario'] || null;
  }

ngOnInit(): void {

  this.carregarSugestoesUsuario();
}

carregarSugestoesUsuario(): void {

  this.emprestimoService.getSugestao(this.usuario!.idUsuario).subscribe({
    next: (data) => {
      this.dataSource = data;
    },
    error: (error) => {
      this.notificacao.openSnack(error.error.message);
    }
  });
}
}
