import { Injectable } from '@angular/core';
import { Emprestimo } from '../domains/emprestimo';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Livro } from '../domains/livro';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private apiUrl = 'http://127.0.0.1:8081/api/emprestimo';

  constructor(private http: HttpClient) {}

  getEmprestimos(): Observable<Emprestimo[]> {

    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  emprestar(emprestimo: any): Observable<Emprestimo> {
    
    return this.http.post<Emprestimo>(this.apiUrl, emprestimo);
  }

  devovler(id: number): Observable<void> {

    const params = new HttpParams().set('idEmprestimo', id);

    return this.http.put<void>(this.apiUrl, params);
  }

  getSugestao(idUsuario: number): Observable<Livro[]> {
    
    const url = `${this.apiUrl}/sugestao`; 
    
    const params = new HttpParams().set('idUsuario', idUsuario);

    return this.http.get<Livro[]>(url, { params });
  }

}
