import { TestBed } from '@angular/core/testing';

import { RecipeAuthGuard } from './recipe-auth.guard';

describe('RecipeAuthGuard', () => {
  let guard: RecipeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
