import { TestBed } from '@angular/core/testing';

import { CadastroMinisterioService } from './cadastro-ministerio.service';

describe('CadastroMinisterioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroMinisterioService = TestBed.get(CadastroMinisterioService);
    expect(service).toBeTruthy();
  });
});
