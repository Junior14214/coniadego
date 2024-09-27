import { TestBed } from '@angular/core/testing';

import { ConsultarMinisteriosService } from './consultar-ministerios.service';

describe('ConsultarMinisteriosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarMinisteriosService = TestBed.get(ConsultarMinisteriosService);
    expect(service).toBeTruthy();
  });
});
