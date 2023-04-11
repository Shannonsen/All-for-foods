import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontImageComponent } from './front-image.component';

describe('FrontImageComponent', () => {
  let component: FrontImageComponent;
  let fixture: ComponentFixture<FrontImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
