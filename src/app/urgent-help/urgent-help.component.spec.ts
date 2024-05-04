import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentHelpComponent } from './urgent-help.component';

describe('UrgentHelpComponent', () => {
  let component: UrgentHelpComponent;
  let fixture: ComponentFixture<UrgentHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrgentHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrgentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
