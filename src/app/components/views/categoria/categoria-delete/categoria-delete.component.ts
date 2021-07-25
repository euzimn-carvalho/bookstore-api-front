import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.getById();
  }

  getById(): void {
    this.service.getById(this.categoria.id!).subscribe((result) => {
      this.categoria.nome = result.nome;
      this.categoria.descricao = result.descricao;
    });
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe((result) => {
      this.service.mensagem("Categoria deletada com sucesso!");
      this.router.navigate(["/categorias"]);
    }, err => {
      this.service.mensagem(err.error.erro)
    });
  }

  cancel(): void {
    this.router.navigate(["/categorias"]);
  }
}
