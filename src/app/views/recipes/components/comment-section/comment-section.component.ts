import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/views/shared/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  comments: Comment[] = [];
  commentForm: FormGroup;

  @Input() recipeID: number = 0;
  idUser: number = 0
  token: string = ""

   /**
   * @constructor
   * @param formBuilder : Creador del formulario.
   * @param commentService : Servicio de comentarios.
   */

  constructor(private fb: FormBuilder, private commentService: CommentService, private cookieService: CookieService, private router: Router) {
    this.commentForm = this.fb.group({
      comment: ['']
    });
  }

  /**
   * @override
   */

  ngOnInit(): void {
    this.idUser = Number(this.cookieService.get('idUser'));
    this.token = this.cookieService.get('Token');
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  /**
   * Metodo para añadir comentatios con el servicio de comentarios
   */

  addComment() {
    var request = this.commentForm.value;
    this.commentService.postComment(this.recipeID, this.idUser, request['comment'],this.token).subscribe(response =>{
      if (response.code == 201) {
        Swal.fire("CORRECTO", 'Comentario creado', 'success').then(()=>{
          this.router.navigate(['recipes/'+ this.recipeID]).then(() => {
            window.location.reload();
          });
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['recipes/'+ this.recipeID]).then(() => {
            window.location.reload();
          });;
        })
      }
    })

  }

}
