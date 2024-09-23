import { Component } from '@angular/core';
import { Usuario } from '../domains/usuario';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from './usuario.service';
import { NotificacaoService } from '../commons/notificacao.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  dataSource: Usuario[] = [];
  
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'opcoes'];

  constructor(
    private usuarioService: UsuarioService,
    private notificacao: NotificacaoService,
  ) { }

  ngOnInit(): void {

    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  deletarUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.notificacao.openSnack('Usuário deletado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  atualizarUsuario(usuario: Usuario): void {
    
  }
}
