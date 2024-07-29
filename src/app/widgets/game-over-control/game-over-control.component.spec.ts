import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverControlComponent } from './game-over-control.component';
import { GameSetupService } from '@app/shared/services/game-setup';
import { HexManagementService } from '@app/shared/services/hex-management';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('GameOverControlComponent', () => {
  let component: GameOverControlComponent;
  let fixture: ComponentFixture<GameOverControlComponent>;
  let gameSetupService: GameSetupService;
  let hexManagementService: HexManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverControlComponent, HttpClientTestingModule, RouterModule.forRoot([])],
    }).compileComponents();

    gameSetupService = TestBed.inject(GameSetupService);
    hexManagementService = TestBed.inject(HexManagementService);
    fixture = TestBed.createComponent(GameOverControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
