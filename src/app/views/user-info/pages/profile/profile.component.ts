import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/views/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
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
  isUser: boolean = true;

  profileForm: FormGroup;
  user: User = <User>{};

  /**
   * @constructor
   * @param {FormBuilder} formBuilder : Creador del formulario.
   * @param {LoginService} loginService : Servicio de inicio de sesión.
   * @param {UserService} userService : Servicio de usuarios.
   * @param {ActivatedRoute} route : Navegador de rutas.
   */
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private loginService: LoginService, private cookieService: CookieService) {
    this.profileForm = this.formBuilder.group({});
  }

  /**
   * @override
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileID = Number(params['id']);
      var token = this.cookieService.get('Token');
      this.loginService.type_auth(token).subscribe(data => {
        this.userService.getUserById(data.results.id).subscribe(user => {
          if (data.results.id === this.profileID || Number.isNaN(this.profileID)) {
            this.name = user.results.username;
            this.email = user.results.email;
            this.icon = user.results.icon;
            this.description = user.results.description;
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
    });

    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  /**
   * Método que se lanza al editar la información del perfil del usuario
   */
  onEdit() {
    alert("información actualizada")
  }

  /**
   * Método que se lanza al dar click al botón de follow
   */
  follow() {
    const star = document.getElementById("btn-follow")!;
    if (star.style.backgroundColor == "mediumaquamarine") {
      star.style.backgroundColor = "crimson";
      star.innerHTML = "Seguir";
      star.style.scale = "1";
    } else {
      star.style.backgroundColor = "mediumaquamarine";
      star.innerHTML = "Siguiendo";
      star.style.scale = "1";
    }

  }

}
