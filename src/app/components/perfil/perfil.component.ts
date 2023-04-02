import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navegar(){
    this.route.navigate(['/home'])
  }

}
