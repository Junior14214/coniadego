import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMembrosComponent } from './consultar-membros.component';

describe('ConsultarMembrosComponent', () => {
  let component: ConsultarMembrosComponent;
  let fixture: ComponentFixture<ConsultarMembrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarMembrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarMembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
