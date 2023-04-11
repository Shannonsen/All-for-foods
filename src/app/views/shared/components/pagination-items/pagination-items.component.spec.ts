import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationItemsComponent } from './pagination-items.component';

describe('PaginationItemsComponent', () => {
  let component: PaginationItemsComponent;
  let fixture: ComponentFixture<PaginationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
