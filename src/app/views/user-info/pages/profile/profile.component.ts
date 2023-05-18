import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/views/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
/**
 * Clase que representa la información del usuario junto con la lista de sus recetas y sus recetas favoritas.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string = '';
  icon: string = '';
  email: string = '';
  description: string = '';
  profileID: number | undefined;
  profileIDString: string = ""
  isUser: boolean = true;

  profileForm: FormGroup;
  user: User = <User>{};
  typeFollow:string = ""

  token: string =""
  userId: string=""

  /**
   * @constructor
   * @param {FormBuilder} formBuilder : Creador del formulario.
   * @param {LoginService} loginService : Servicio de inicio de sesión.
   * @param {UserService} userService : Servicio de usuarios.
   * @param {ActivatedRoute} route : Navegador de rutas.
   */
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private loginService: LoginService, private cookieService: CookieService, private router: Router) {
    this.profileForm = this.formBuilder.group({});
  }

  /**
   * @override
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileID = Number(params['id']);
      this.profileIDString = params['id'];
      this.token = this.cookieService.get('Token');
      this.userId = this.cookieService.get('idUser');
      this.loginService.typeAuth( this.token).subscribe(data => {
        this.userService.getUserById(data.results.id).subscribe(user => {
          if (data.results.id === this.profileID || Number.isNaN(this.profileID)) {
            this.name = user.results.username;
            this.email = user.results.email;
            this.icon = user.results.icon;
            this.description = user.results.description;
            this.profileForm.setValue({
              name: user.results.username,
              email: user.results.email,
              icon: user.results.icon,
              description: user.results.description
            });
          }else{
            this.userService.getUserById(this.profileID).subscribe(user => {
              this.isUser = false;
              this.name = user.results.username;
              this.email = user.results.email;
              this.icon = user.results.icon;
              this.description = user.results.description;
            });
          }
        })
      })
      this.userService.isFollowing(Number(this.userId), [this.profileID], this.token).subscribe(typeFollow =>{
        if(typeFollow.results[0].isFollow){
          this.typeFollow = "true"
        }
      })
    });

    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      icon: new FormControl('')
    });
  }

  /**
   * Método que se lanza al editar la información del perfil del usuario
   */
  onEdit() {
    var request = this.profileForm.value;
    var token = this.cookieService.get('Token');
    this.loginService.typeAuth(token).subscribe(data => {
      this.userService.getUserById(data.results.id).subscribe(user => {
        type UserBody ={
          email?: string,
          username?: string,
          icon?: string,
          description?: string,
        }
        const body: UserBody = {};
        if(user.results.username != request['name']){
          body.username = request['name'];
        }
        if(user.results.email != request['email']){
          body.email = request['email'];
        }
        if(user.results.icon != request['icon']){
          body.icon = request['icon'];
        }
        if(user.results.description != request['description']){
          body.description = request['description'];
        }
        this.removeEmptyValues(body)
        this.userService.putUserById(data.results.id, token, body).subscribe(result =>{
          if(result.code == 200){
            Swal.fire("CORRECTO", 'Perfil editado', 'success').then(()=>{
              this.router.navigate(['profile']).then(() => {
                window.location.reload();
              });
            })
          }
        })
      });
    });
  }

  removeEmptyValues(object: any) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var value = object[key];
            if (value === null || value === undefined || value === '') {
                delete object[key];
            }
        }
    }
}

  /**
   * Método que se lanza al dar click al botón de follow
   */

  follow() {
    this.userService.postFollow(Number(this.userId), Number(this.profileID), this.token).subscribe(response =>{
      if(response.code == 201){
        Swal.fire("CORRECTO", 'Estas siguiendo a ' + this.name, 'success').then(()=>{
          this.router.navigate(['profile/' + this.profileID]).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['profile/' + this.profileID]).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

  unFollow(){
    this.userService.deleteFollow(Number(this.userId), Number(this.profileID), this.token).subscribe(response =>{
      if(response.code == 200){
        Swal.fire("CORRECTO", 'Has dejado de seguir a ' + this.name, 'success').then(()=>{
          this.router.navigate(['profile/' + this.profileID]).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['profile/' + this.profileID]).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
