import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaultPage } from './view-vault.page';

describe('ViewVaultPage', () => {
  let component: ViewVaultPage;
  let fixture: ComponentFixture<ViewVaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVaultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
