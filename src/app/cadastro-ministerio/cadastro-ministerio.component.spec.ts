import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMinisterioComponent } from './cadastro-ministerio.component';

describe('CadastroMinisterioComponent', () => {
  let component: CadastroMinisterioComponent;
  let fixture: ComponentFixture<CadastroMinisterioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroMinisterioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMinisterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
