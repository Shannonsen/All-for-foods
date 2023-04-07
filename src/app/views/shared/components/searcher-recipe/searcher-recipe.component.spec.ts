import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherRecipeComponent } from './searcher-recipe.component';

describe('SearcherRecipeComponent', () => {
  let component: SearcherRecipeComponent;
  let fixture: ComponentFixture<SearcherRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcherRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcherRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
