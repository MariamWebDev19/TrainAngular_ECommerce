import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsliderComponent } from './mainslider.component';

describe('MainsliderComponent', () => {
  let component: MainsliderComponent;
  let fixture: ComponentFixture<MainsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainsliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainsliderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
