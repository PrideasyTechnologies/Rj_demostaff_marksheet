import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinyearComponent } from './finyear.component';

describe('FinyearComponent', () => {
  let component: FinyearComponent;
  let fixture: ComponentFixture<FinyearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinyearComponent]
    });
    fixture = TestBed.createComponent(FinyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
