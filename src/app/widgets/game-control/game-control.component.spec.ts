import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameControlComponent } from './game-control.component';
import { GameSetupService } from '@app/shared/services/game-setup';
import { HexManagementService } from '@app/shared/services/hex-management';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameControlComponent', () => {
  let component: GameControlComponent;
  let fixture: ComponentFixture<GameControlComponent>;
  let gameSetupService: GameSetupService;
  let hexManagementService: HexManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameControlComponent, HttpClientTestingModule],
      providers: [GameSetupService, HexManagementService],
    }).compileComponents();

    gameSetupService = TestBed.inject(GameSetupService);
    hexManagementService = TestBed.inject(HexManagementService);
    fixture = TestBed.createComponent(GameControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
