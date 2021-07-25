import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private router: Router, private route: ActivatedRoute, private service: CategoriaService) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.getById(this.categoria.id!).subscribe((result) => {
      this.categoria.nome = result.nome;
      this.categoria.descricao = result.descricao;
    });
  }

  update(): void{
    this.service.update(this.categoria).subscribe((result) => {
      this.service.mensagem("Categoria Atualizada com sucesso!");
      this.router.navigate(["categorias"])
    }, err => {
      this.service.mensagem("Validar se todos os campos estão preenchidos corretamente!");
      console.log(err.error)
    });
  }

  cancel(): void {
    this.router.navigate(["/categorias"]);
  }

}
