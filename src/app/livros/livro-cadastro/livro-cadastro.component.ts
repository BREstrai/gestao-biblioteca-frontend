import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacaoService } from '../../commons/notificacao.service';
import { LivroService } from '../livro.service';
import { Livro } from '../../domains/livro';
import { CategoriaEnum } from '../../enumerations/categoria';

@Component({
  selector: 'app-livro-cadastro',
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
  templateUrl: './livro-cadastro.component.html',
  styleUrl: './livro-cadastro.component.scss'
})
export class LivroCadastroComponent {
  livroForm: FormGroup;
  livro: Livro | null = null;
  categorias = Object.values(CategoriaEnum);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private livroService: LivroService,
    private notificacao: NotificacaoService,
  ) {

    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      categoria: ['', Validators.required],
      dhPublicacao: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();

    this.livro = navigation?.extras?.state?.['livro'] || null;
  }

  ngOnInit(): void {


    if (this.livro) {

      this.livroForm.patchValue(this.livro);
    }
  }

  salvar(): void {

    console.log(this.livroForm.value);

    if (this.livroForm.valid) {

      if (!!this.livro) {

        this.atualizarLivro();
        return;
      }

      this.criarNovoLivro();
    }
  }

  criarNovoLivro() {

    this.livroService.criarNovoLivro(this.livroForm.value).subscribe({
      next: () => {
        this.router.navigate(['/livro']);
        this.notificacao.openSnack('Livro criado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }

  atualizarLivro() {
    
    this.livroService.atualizarLivro(this.livro!.idLivro, this.livroForm.value).subscribe({
      next: () => {
        this.router.navigate(['/livro']);
        this.notificacao.openSnack('Livro atualizado com sucesso.');
      },
      error: (error) => {
        this.notificacao.openSnack(error.error.message);
      }
    });
  }
}
