import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugPoisoningComponent } from './drug-poisoning.component';

describe('DrugPoisoningComponent', () => {
  let component: DrugPoisoningComponent;
  let fixture: ComponentFixture<DrugPoisoningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugPoisoningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugPoisoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
