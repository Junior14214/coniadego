import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAnuidadeComponent } from './cadastro-anuidade.component';

describe('CadastroAnuidadeComponent', () => {
  let component: CadastroAnuidadeComponent;
  let fixture: ComponentFixture<CadastroAnuidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAnuidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAnuidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
