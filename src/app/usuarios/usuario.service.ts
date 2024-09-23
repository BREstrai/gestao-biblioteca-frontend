import { Injectable } from '@angular/core';
import { Usuario } from '../domains/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:8081/api/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.apiUrl);
  }

  deleteUsuario(id: number): Observable<void> {

    const params = new HttpParams().set('idUsuario', id);

    return this.http.delete<void>(this.apiUrl, { params });
  }
}
