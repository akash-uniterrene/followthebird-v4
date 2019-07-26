import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultsPage } from './vaults.page';

describe('VaultsPage', () => {
  let component: VaultsPage;
  let fixture: ComponentFixture<VaultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
