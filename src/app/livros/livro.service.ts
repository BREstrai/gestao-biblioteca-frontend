import { Injectable } from '@angular/core';
import { Livro } from '../domains/livro';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private apiUrl = 'http://127.0.0.1:8081/api/livro';

  constructor(private http: HttpClient) { }

  getLivros(): Observable<Livro[]> {

    return this.http.get<Livro[]>(this.apiUrl);
  }

  criarNovoLivro(livro: Livro): Observable<Livro> {

    return this.http.post<Livro>(this.apiUrl, livro);
  }

  atualizarLivro(id: number, livro: Livro): Observable<Livro> {

    const params = new HttpParams().set('idLivro', id);

    return this.http.put<Livro>(this.apiUrl, livro, { params: params });
  }

  deleteLivro(id: number): Observable<void> {

    const params = new HttpParams().set('idLivro', id);

    return this.http.delete<void>(this.apiUrl, { params });
  }

}
