import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  token: any = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('Token');
  }

  logout(){
    this.router.navigate(['home']).then(() => {
      localStorage.removeItem("Token");
      window.location.reload();
    });
  }
}
