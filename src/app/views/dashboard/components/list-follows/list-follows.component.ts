import { Component, OnInit, Input} from '@angular/core';
import { User } from 'src/app/views/shared/models/user.model';

@Component({
  selector: 'app-list-follows',
  templateUrl: './list-follows.component.html',
  styleUrls: ['./list-follows.component.scss']
})
export class ListFollowsComponent implements OnInit {

  @Input() follows: Number[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

}
