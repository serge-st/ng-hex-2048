import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BreakpointObserverState } from './interfaces/breakpoint-observer-state';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  readonly state$: Observable<BreakpointObserverState> = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map((result) => ({ isDesktop: result.matches, isMobile: !result.matches })));
}
