import { Component, Input, OnInit, DoCheck, KeyValueDiffers, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Food } from '../../models/food.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-pagination-items',
  templateUrl: './pagination-items.component.html',
  styleUrls: ['./pagination-items.component.scss']
})
export class PaginationItemsComponent implements OnInit {

  @Input() items: Food[] = []
  currentPage: number = 1;
  @Output() outputCurrentPage = new EventEmitter<number>();
  @Input() pageSize: number = 3;
  @Input() totalPages: number[] = [];
  users: User[] = [];
  differ: any;

  constructor(private differs: KeyValueDiffers, private userService: UserService) {
    this.differ = this.differs.find({}).create();
  }

  async ngOnInit(): Promise<void> {

    this.userService.getAllUsers().subscribe(users => {
      this.users = users as User[];
    });
    //await new Promise(f => setTimeout(f, 1 * 1000));
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item: any) => {

      });
    }
  }

  getAuthorName(authorId: number): string {
    const author = this.users.find(user => user.id === authorId);
    return author?.user || '';
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.outputCurrentPage.emit(this.currentPage);
  }
}
