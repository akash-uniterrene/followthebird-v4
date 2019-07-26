import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoryPage } from './add-story.page';

describe('AddStoryPage', () => {
  let component: AddStoryPage;
  let fixture: ComponentFixture<AddStoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
