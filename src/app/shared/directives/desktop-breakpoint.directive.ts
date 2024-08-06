import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appShowOnDesktop]',
  standalone: true,
})
export class DesktopBreakpointDirective {
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isDesktop = result.matches;
        this.processBreakpointChange();
      });
  }
  isDesktop!: boolean;
  @Input({ required: true }) appShowOnDesktop!: boolean;

  ngOnInit(): void {
    this.viewContainer.clear();
    this.processBreakpointChange();
  }

  processBreakpointChange() {
    if (this.isDesktop === this.appShowOnDesktop) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
