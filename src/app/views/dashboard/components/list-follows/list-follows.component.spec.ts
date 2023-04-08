import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowsComponent } from './list-follows.component';

describe('ListFollowsComponent', () => {
  let component: ListFollowsComponent;
  let fixture: ComponentFixture<ListFollowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFollowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
