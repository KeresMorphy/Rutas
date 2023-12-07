import { TestBed } from '@angular/core/testing';

import { SellerModalService } from './seller-modal.service';

describe('SellerModalService', () => {
  let service: SellerModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
