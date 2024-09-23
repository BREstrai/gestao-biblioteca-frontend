import { Injectable } from '@angular/core';
import { Emprestimo } from '../domains/emprestimo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private apiUrl = 'http://127.0.0.1:8081/api/emprestimo';

  constructor(private http: HttpClient) {}

  getEmprestimos(): Observable<Emprestimo[]> {

    return this.http.get<Emprestimo[]>(this.apiUrl);
  }
}
