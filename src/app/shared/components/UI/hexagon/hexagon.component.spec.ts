import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HexagonComponent } from './hexagon.component';
import { HexManagementService } from '@app/shared/services/hex-management';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HexagonComponent', () => {
  let component: HexagonComponent;
  let fixture: ComponentFixture<HexagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexagonComponent],
      providers: [HexManagementService, provideHttpClientTesting(), provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(HexagonComponent);
    component = fixture.componentInstance;
    component.hexDetails = { q: 0, r: 0, s: 0 };
    component.offset = { x: 0, y: 0 };
    component.gap = 0;
    component.hexWidth = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw if hexCoords are not correct', () => {
    component.hexDetails = { q: 0, r: 0, s: 1 };
    expect(() => component.ngOnChanges()).toThrow();
  });
});
