import { TestBed } from '@angular/core/testing';

import { MetalProductService } from './metal-product.service';

describe('MetalProductService', () => {
  let service: MetalProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
