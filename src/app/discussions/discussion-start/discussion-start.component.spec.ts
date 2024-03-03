import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionStartComponent } from './discussion-start.component';

describe('DiscussionStartComponent', () => {
  let component: DiscussionStartComponent;
  let fixture: ComponentFixture<DiscussionStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussionStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
