import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Usuario } from '../../domains/usuario';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { NotificacaoService } from '../../commons/notificacao.service';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.scss'
})
export class UsuarioCadastroComponent {
  usuarioForm: FormGroup;
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notificacao: NotificacaoService,
  ) {
    
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();

    this.usuario = navigation?.extras?.state?.['usuario'] || null;
  }

  ngOnInit(): void {

    if (this.usuario) {

      this.usuarioForm.patchValue(this.usuario);
    }
  }

  salvar(): void {

    if (this.usuarioForm.valid) {

      if (!!this.usuario) {

        this.atualizarUsuario();

        return;
      }

      this.criarNovoUsuario();
    }
  }

  private criarNovoUsuario() {

    this.usuarioService.criarNovoUsuario(this.usuarioForm.value).subscribe({
      next: () => {
        this.router.navigate(['/usuario']);
        this.notificacao.openSnack('Usuário criado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  private atualizarUsuario() {

    this.usuarioService.atualizarUsuario(this.usuario!.idUsuario, this.usuarioForm.value).subscribe({
      next: () => {
        this.router.navigate(['/usuario']);
        this.notificacao.openSnack('Usuário atualizado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }
}
