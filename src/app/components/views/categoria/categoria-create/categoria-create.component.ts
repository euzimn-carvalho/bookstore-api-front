import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  constructor(private service: CategoriaService, private router: Router) {}

  categoria: Categoria = {
    nome: "",
    descricao: "",
  };

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe((result) => {
      this.router.navigate(["/categorias"]);
      this.service.mensagem("Categoria criada com sucesso!");
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        let erro = err.error.errors[i];
        this.service.mensagem(erro.fieldName + " " + erro.message);
      }
    });
  }

  cancel(): void{
    this.router.navigate(["/categorias"]);
  }
}
