import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrionProgramsComponent } from './nutrion-programs.component';

describe('NutrionProgramsComponent', () => {
  let component: NutrionProgramsComponent;
  let fixture: ComponentFixture<NutrionProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrionProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrionProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
