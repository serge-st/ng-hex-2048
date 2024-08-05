import { TestBed } from '@angular/core/testing';
import { HexManagementService } from './hex-management.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HexManagementService', () => {
  let service: HexManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(HexManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
