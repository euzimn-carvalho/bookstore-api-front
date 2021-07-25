import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  livro: Livro = {
    id: "",
    nome_autor: "",
    titulo: "",
    texto: "",
  };

  id_cat = "";
  id_livro = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LivroService
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.id_livro = this.route.snapshot.paramMap.get("id_livro")!;
    this.getById();
  }

  getById() {
    this.service.findById(this.id_livro).subscribe((result) => {
      this.livro = result;
    });
  }

  update(): void {
    this.service.update(this.id_livro, this.livro).subscribe(
      (result) => {
        this.service.mensagem("Livro atualizado com sucesso");
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
      },
      (err) => {
        this.service.mensagem("Houve um erro na atualização do livro, tente novamente");
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        console.log(err);
      }
    );
  }

  cancel(): void {
    this.router.navigate([`/categorias/${this.id_cat}/livros`]);
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
}
