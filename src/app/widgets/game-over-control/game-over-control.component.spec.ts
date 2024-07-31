import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverControlComponent } from './game-over-control.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('GameOverControlComponent', () => {
  let component: GameOverControlComponent;
  let fixture: ComponentFixture<GameOverControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverControlComponent, HttpClientTestingModule, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOverControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
