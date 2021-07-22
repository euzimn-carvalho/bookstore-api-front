import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Categoria } from "./categoria.model";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  baseUrl: String = environment.urlBase;

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }
}
