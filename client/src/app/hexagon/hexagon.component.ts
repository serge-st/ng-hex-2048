import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { StyleVariables, HexCoord, Position } from '@app/shared/interfaces';
import { GridUtilityComponent } from '@app/shared/components';
import { StoreService } from '@app/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-hexagon',
  standalone: true,
  imports: [],
  templateUrl: './hexagon.component.html',
  styleUrl: './hexagon.component.scss',
})
export class HexagonComponent extends GridUtilityComponent implements OnChanges {
  gap!: number;
  hexWidth!: number;
  constructor(
    private elRef: ElementRef,
    private storeService: StoreService,
  ) {
    super();
    this.storeService.state$
      .pipe(takeUntilDestroyed())
      .pipe(distinctUntilChanged())
      .subscribe((state) => {
        this.gap = state.gap;
        this.hexWidth = state.hexWidth;
      });
  }

  @Input({ required: true }) coord!: HexCoord;
  @Input({ required: true }) offset!: Position;
  @Input() value: number = 0;
  hexHeight!: number;
  pixelCoord!: Position;
  styleVariables!: StyleVariables;

  ngOnChanges(): void {
    this.validateHexCoordinates();
    this.updateProperies();
  }

  validateHexCoordinates() {
    if (Math.round(this.coord.q + this.coord.r + this.coord.s) !== 0) {
      const badCoord = JSON.stringify({ q: this.coord.q, r: this.coord.r, s: this.coord.s });
      throw new Error(`Invalid hex coordinates: ${badCoord}; q + r + s must equal 0`);
    }
  }

  setPixelCoords(): void {
    const hexRadius = this.hexWidth / 2;
    const gapCoefficient = hexRadius + this.gap / 2;
    const x = (this.coordToPixel.f0 * this.coord.q + this.coordToPixel.f1 * this.coord.r) * gapCoefficient;
    const y = (this.coordToPixel.f2 * this.coord.q + this.coordToPixel.f3 * this.coord.r) * gapCoefficient;

    // Offset is needed to place the hexagon { q: 0, r: 0, s: 0 } in the center of the grid
    // and the following hexagons around it
    const xWithOffset = x + this.offset.x;
    const yWithOffset = y + this.offset.y;
    this.pixelCoord = {
      x: xWithOffset,
      y: yWithOffset,
    };
  }

  bindPropertiesToHost(): void {
    this.elRef.nativeElement.style.setProperty('--width', this.styleVariables.width);
    this.elRef.nativeElement.style.setProperty('--height', this.styleVariables.height);
    this.elRef.nativeElement.style.setProperty('--x-coord', this.styleVariables.xCoord);
    this.elRef.nativeElement.style.setProperty('--y-coord', this.styleVariables.yCoord);
    this.elRef.nativeElement.setAttribute('data-q', this.coord.q.toString());
    this.elRef.nativeElement.setAttribute('data-s', this.coord.s.toString());
    this.elRef.nativeElement.setAttribute('data-r', this.coord.r.toString());
    this.elRef.nativeElement.setAttribute('data-value', this.value.toString());
  }

  updateProperies(): void {
    if (!this.coord) return;
    this.setHexHeight();
    this.setPixelCoords();
    this.setStyleVariables(this.hexWidth, this.hexHeight, this.pixelCoord.x, this.pixelCoord.y);
    this.bindPropertiesToHost();
  }
}
