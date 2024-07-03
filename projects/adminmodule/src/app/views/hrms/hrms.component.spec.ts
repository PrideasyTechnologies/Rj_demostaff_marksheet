import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsComponent } from './hrms.component';

describe('QuestionpaperuploadComponent', () => {
  let component: HrmsComponent;
  let fixture: ComponentFixture<HrmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrmsComponent]
    });
    fixture = TestBed.createComponent(HrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
