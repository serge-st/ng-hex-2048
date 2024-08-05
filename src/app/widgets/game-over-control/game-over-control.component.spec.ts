import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverControlComponent } from './game-over-control.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GameOverControlComponent', () => {
  let component: GameOverControlComponent;
  let fixture: ComponentFixture<GameOverControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverControlComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOverControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
