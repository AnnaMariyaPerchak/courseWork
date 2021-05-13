import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNutritionsComponent } from './admin-nutritions.component';

describe('AdminNutritionsComponent', () => {
  let component: AdminNutritionsComponent;
  let fixture: ComponentFixture<AdminNutritionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNutritionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNutritionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
