import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LivrosComponent } from './livros/livros.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { SugerirComponent } from './emprestimos/sugerir/sugerir.component';
import { EmprestarComponent } from './emprestimos/emprestar/emprestar.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { LivroCadastroComponent } from './livros/livro-cadastro/livro-cadastro.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'usuario', component: UsuariosComponent},
    {path: 'usuario/cadastro', component: UsuarioCadastroComponent},
    {path: 'livro', component: LivrosComponent},
    {path: 'livro/cadastro', component: LivroCadastroComponent},
    {path: 'emprestimo', component: EmprestimosComponent},
    {path: 'emprestimo/emprestar', component: EmprestarComponent},
    {path: 'emprestimo/sugerir', component: SugerirComponent},
];
