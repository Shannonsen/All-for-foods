import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  token: any = "";

  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('Token');
  }

}
