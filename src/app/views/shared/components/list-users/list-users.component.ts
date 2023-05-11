import { Component, OnInit , Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @Input() users: User[] = [];
  token: any = "";
  @Input() isPanel:string = ""

  constructor(private userService: UserService, private cookieService: CookieService, private recipeService: RecipesService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
  }

  changeColor(id: number) {
    const heart = document.getElementById(String(id))!;
    if (heart.style.color == "red") {
      heart.style.color = "gray";
      heart.style.scale = "1";
    } else {
      heart.style.color = "red";
      heart.style.scale = "1.2";
    }
  }


  deleteUser(id: number){
    this.userService.deleteUser(id, this.token).subscribe(response => {
      if(response.message == "OK"){
        Swal.fire("CORRECTO", 'Usuario eliminado', 'success').then(()=>{
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

  activateUser(id: number){
    this.userService.activeUser(id, this.token).subscribe(response => {
      if(response.message == "OK"){
        Swal.fire("CORRECTO", 'Usuario activado', 'success').then(()=>{
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
