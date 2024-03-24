import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionByCategoryComponent } from './discussion-by-category.component';

describe('DiscussionByCategoryComponent', () => {
  let component: DiscussionByCategoryComponent;
  let fixture: ComponentFixture<DiscussionByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussionByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussionByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
