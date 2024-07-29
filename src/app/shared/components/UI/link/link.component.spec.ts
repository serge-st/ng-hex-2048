import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { RouterModule } from '@angular/router';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to have correct href attribute', () => {
    component.to = '/test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').getAttribute('href')).toBe('/test');
  });

  it('should emit appLinkEvent when clicked', () => {
    const spy = spyOn(component.appLinkEvent, 'emit');
    component.onClickEvent();
    expect(spy).toHaveBeenCalled();
  });
});
