import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardoutwardComponent } from './inwardoutward.component';

describe('InwardoutwardComponent', () => {
  let component: InwardoutwardComponent;
  let fixture: ComponentFixture<InwardoutwardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InwardoutwardComponent]
    });
    fixture = TestBed.createComponent(InwardoutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
