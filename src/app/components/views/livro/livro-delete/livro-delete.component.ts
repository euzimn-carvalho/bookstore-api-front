import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  livro: Livro = {
    id: '', 
    nome_autor: '',
    texto: '',
    titulo: ''
  }

  id_cat = '';
  id_livro = '';

  constructor( private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.id_livro = this.route.snapshot.paramMap.get("id_livro")!;
    this.getById();
  }

  getById(){
    this.service.findById(this.id_livro).subscribe((result) => {
      this.livro = result;
    });
  }


  delete(): void{
    this.service.delete(this.id_livro).subscribe((result) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro deletado com Sucesso")!
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Houve um erro ao deletar esse livro. Tente novamente mais tarde...")!
    })
  }


   cancel(): void{
     this.router.navigate([`/categorias/${this.id_cat}/livros`])
   }

}
