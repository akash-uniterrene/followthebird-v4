import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCreatePage } from './message-create.page';

describe('MessageCreatePage', () => {
  let component: MessageCreatePage;
  let fixture: ComponentFixture<MessageCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
