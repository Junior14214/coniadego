import { TestBed } from '@angular/core/testing';

import { CadastroAnuidadeService } from './cadastro-anuidade.service';

describe('CadastroAnuidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroAnuidadeService = TestBed.get(CadastroAnuidadeService);
    expect(service).toBeTruthy();
  });
});
