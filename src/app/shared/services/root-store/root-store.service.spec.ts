import { TestBed } from '@angular/core/testing';
import { RootStoreService } from './root-store.service';
import { GameSetupService } from '../game-setup';
import { HexManagementService } from '../hex-management';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RootStoreService', () => {
  let service: RootStoreService;
  let gameSetupService: GameSetupService;
  let hexManagementService: HexManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(RootStoreService);
    gameSetupService = TestBed.inject(GameSetupService);
    hexManagementService = TestBed.inject(HexManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
