import { TestBed } from '@angular/core/testing';
import { HexManagementService } from './hex-management.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HexManagementService', () => {
  let service: HexManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HexManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
