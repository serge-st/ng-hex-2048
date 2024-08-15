import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWinComponent } from './test-win.component';

describe('TestWinComponent', () => {
  let component: TestWinComponent;
  let fixture: ComponentFixture<TestWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
