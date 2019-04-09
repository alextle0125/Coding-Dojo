import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenBirthComponent } from './teen-birth.component';

describe('TeenBirthComponent', () => {
  let component: TeenBirthComponent;
  let fixture: ComponentFixture<TeenBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeenBirthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeenBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
