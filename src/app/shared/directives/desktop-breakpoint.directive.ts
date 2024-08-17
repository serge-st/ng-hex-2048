import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserverService } from '../services/breakpoint-observer';

@Directive({
  selector: '[appShowOnDesktop]',
  standalone: true,
})
export class DesktopBreakpointDirective {
  @Input({ required: true }) appShowOnDesktop!: boolean;
  isDesktop!: boolean;

  constructor(
    private readonly breakpointObserverService: BreakpointObserverService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
  ) {
    this.breakpointObserverService.state$.pipe(takeUntilDestroyed()).subscribe((result) => {
      this.isDesktop = result.isDesktop;
      this.processBreakpointChange();
    });
  }

  ngOnInit(): void {
    this.viewContainer.clear();
    this.processBreakpointChange();
  }

  processBreakpointChange() {
    if (this.isDesktop === this.appShowOnDesktop) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
