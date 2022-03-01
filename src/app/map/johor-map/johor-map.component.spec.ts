import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JohorMapComponent } from './johor-map.component';

describe('JohorMapComponent', () => {
  let component: JohorMapComponent;
  let fixture: ComponentFixture<JohorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JohorMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JohorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
