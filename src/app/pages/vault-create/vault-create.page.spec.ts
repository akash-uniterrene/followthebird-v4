import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultCreatePage } from './vault-create.page';

describe('VaultCreatePage', () => {
  let component: VaultCreatePage;
  let fixture: ComponentFixture<VaultCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
