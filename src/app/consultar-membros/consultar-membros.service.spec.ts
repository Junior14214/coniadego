import { TestBed } from '@angular/core/testing';

import { ConsultarMembrosService } from './consultar-membros.service';

describe('ConsultarMembrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarMembrosService = TestBed.get(ConsultarMembrosService);
    expect(service).toBeTruthy();
  });
});
