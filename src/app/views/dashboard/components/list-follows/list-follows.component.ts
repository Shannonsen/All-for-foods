import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/views/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-follows',
  templateUrl: './list-follows.component.html',
  styleUrls: ['./list-follows.component.scss']
})
export class ListFollowsComponent implements OnInit {

  @Input() follows: number[] = [];
  users: User[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  getById(id: number) {
    return 'foodie ' + id
  }

}
