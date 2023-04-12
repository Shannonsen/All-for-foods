import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFollowsListComponent } from './recipes-follows-list.component';

describe('RecipesFollowsListComponent', () => {
  let component: RecipesFollowsListComponent;
  let fixture: ComponentFixture<RecipesFollowsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesFollowsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesFollowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
