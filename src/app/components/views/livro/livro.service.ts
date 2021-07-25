import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})
export class LivroService {
  baseUrl: String = environment.urlBase;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(id_cat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  findById(id_livro: String): Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id_livro}`;
    return this.http.get<Livro>(url);
  }

  create(livro: Livro, id_cat: String): Observable<void> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.post<void>(url, livro);
  }

  update(id_livro: String, livro: Livro): Observable<void>{
    const url = `${this.baseUrl}/livros/${id_livro}`;
    return this.http.put<void>(url, livro);
  }

  delete(id_livro: String): Observable<void>{
    const url = `${this.baseUrl}/livros/${id_livro}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String){
    this.snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }
}
