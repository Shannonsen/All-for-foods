import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommentsPaginationComponent } from './list-comments-pagination.component';

describe('ListCommentsPaginationComponent', () => {
  let component: ListCommentsPaginationComponent;
  let fixture: ComponentFixture<ListCommentsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommentsPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommentsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
