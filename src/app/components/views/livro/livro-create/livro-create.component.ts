import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  id_cat: String = "";

  livro: Livro = {
    id: "",
    nome_autor: "",
    texto: "",
    titulo: "",
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  getMessage(){
    
  }

  getMessageTitulo() {
    if (this.titulo.invalid) {
      return "O campo TÍTULO deve conter no mínimo 3 caracteres e no máximo 100";
    }
    return false;
  }
  getMessageNomeAutor() {
    if (this.nome_autor.invalid) {
      return "O campo NOME AUTOR deve conter no mínimo 3 caracteres e no máximo 50";
    }
    return false;
  }
  getMessageTexto() {
    if (this.texto.invalid) {
      return "O Campo TEXTO deve conter no mínimo 10 caracteres e no máximo 10000";
    }
    return false;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      (result) => {
        this.service.mensagem("Livro criado com sucesso!");
        this.routes.navigate([`categorias/${this.id_cat}/livros`]);
      },
      (err) => {
        this.service.mensagem(
          "Houve um erro no cadastro do seu livro, tente novamente"
        );
        this.routes.navigate([`categorias/${this.id_cat}/livros`]);
      }
    );
  }

  cancel(): void {
    this.routes.navigate([`/categorias/${this.id_cat}/livros`]);
  }
}
