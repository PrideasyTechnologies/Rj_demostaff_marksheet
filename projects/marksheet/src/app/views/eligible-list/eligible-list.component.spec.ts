import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibleListComponent } from './eligible-list.component';

describe('EligibleListComponent', () => {
  let component: EligibleListComponent;
  let fixture: ComponentFixture<EligibleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
