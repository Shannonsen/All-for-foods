import { Component, OnInit, Input} from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CookieService } from 'ngx-cookie-service';
import { CommentService } from 'src/app/services/comment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
/**
 * Clase para el listado para la paginación de los comentarios.
 */
@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  @Input() comments: Comment[] = [];
  userId: number=0
  token:string =""

  /**
   * @constructor
   * @param {CookieService} cookieService : Servicio cookies.
   * @param {CommentService} commentService : Servicio de comentarios.
   * @param {Router} router : Navegación de rutas.
   */
  constructor(private cookieService: CookieService, private commentService: CommentService, private router: Router) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('idUser'));
    this.token = this.cookieService.get('Token');
  }

  /**
   * Método para eliminar un comentario en una receta.
   * @param {number} idComment : id del comentario.
   * @param {number} idRecipe  : id de la receta.
   */
  deleteComment(idComment: number, idRecipe: number){
    this.commentService.deleteComment(idComment,this.token).subscribe(response =>{
      if(response.code == 200){
        Swal.fire("CORRECTO", 'Comentario eliminado', 'success').then(()=>{
          this.router.navigate(['recipes/' + idRecipe]).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['recipes/' + idRecipe]).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
