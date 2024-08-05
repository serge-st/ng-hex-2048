import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSetupPageComponent } from './game-setup-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GameSetupPageComponent', () => {
  let component: GameSetupPageComponent;
  let fixture: ComponentFixture<GameSetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSetupPageComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
