import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLossComponent } from './test-loss.component';

describe('TestLossComponent', () => {
  let component: TestLossComponent;
  let fixture: ComponentFixture<TestLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
