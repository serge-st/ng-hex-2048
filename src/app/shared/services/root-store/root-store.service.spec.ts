import { TestBed } from '@angular/core/testing';
import { RootStoreService } from './root-store.service';
import { GameSetupService } from '../game-setup';
import { HexManagementService } from '../hex-management';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RootStoreService', () => {
  let service: RootStoreService;
  let gameSetupService: GameSetupService;
  let hexManagementService: HexManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RootStoreService);
    gameSetupService = TestBed.inject(GameSetupService);
    hexManagementService = TestBed.inject(HexManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
