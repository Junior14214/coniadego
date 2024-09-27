import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMinisteriosComponent } from './consultar-ministerios.component';

describe('ConsultarMinisteriosComponent', () => {
  let component: ConsultarMinisteriosComponent;
  let fixture: ComponentFixture<ConsultarMinisteriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarMinisteriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarMinisteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
