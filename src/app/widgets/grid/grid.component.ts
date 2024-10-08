import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { HexagonComponent } from '@app/shared/components/UI';
import { GridUtilStyleVariables, Position, HexData, HexCoord } from '@app/shared/interfaces';
import { GridUtilityComponent } from '@app/shared/components';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { GameState, NgChanges } from '@app/shared/types';
import { getCSSVariableString, isHexAEqualHexB } from '@app/shared/helpers';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [HexagonComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent extends GridUtilityComponent implements OnChanges {
  @HostBinding('style') get cssVariables() {
    return this.styleVariables ? getCSSVariableString(this.styleVariables) : undefined;
  }

  // GameSetupService values
  @Input({ required: true }) radius!: number | null;
  @Input({ required: true }) gap!: number | null;
  @Input({ required: true }) hexWidth!: number | null;
  @Input({ required: true }) gameState!: GameState | null;

  // HexManagementService values
  @Input() hexData: HexData[] = [];
  @Input() hexesToDelete: HexData[] = [];

  // params calculated within the component
  previousHexData: HexData[] = [];
  hexHeight!: number;
  gridWidth!: number;
  gridHeight!: number;
  offset!: Position;
  styleVariables!: GridUtilStyleVariables;
  backgroundHexCoords!: HexCoord[];

  private readonly HEX_HORIZONTAL_SPAN_RATIO = 0.75;

  get isSetup(): boolean {
    return this.gameState === 'setup';
  }

  constructor() {
    super();
  }

  ngOnChanges(changes: NgChanges<GridComponent>): void {
    const { radius, gap, hexWidth, hexData: hexDataState } = changes;
    const gridDimensionsChange = [radius, gap, hexWidth].some((el) => !!el);
    const isNewRadius = !!radius;

    gridDimensionsChange && this.updateProperies(isNewRadius);

    if (!hexDataState || hexDataState.currentValue.length === 0) return;

    this.processHexDataState(hexDataState);
  }

  private processHexDataState(hexDataState: NgChanges<GridComponent>['hexData']): void {
    this.previousHexData = hexDataState.previousValue;
    this.hexData = this.applyAnimations(hexDataState.currentValue);
  }

  trackByCoord(_index: number, hexCoord: HexCoord): string {
    return `${hexCoord.q},${hexCoord.r},${hexCoord.s}`;
  }

  trackByID(_index: number, hex: HexData): number {
    return hex.id;
  }

  setGridWidth(): void {
    if (!this.hexWidth || this.gap === null || !this.radius) return;

    const hexesWidth = this.hexWidth + this.hexWidth * this.radius * this.HEX_HORIZONTAL_SPAN_RATIO * 2;
    const gapCompensation = this.radius * this.HEX_HORIZONTAL_SPAN_RATIO * 2 * this.gap;
    const padding = this.gap * 2 + gapCompensation;

    this.gridWidth = hexesWidth + padding;
  }

  setGridHeight(): void {
    if (this.gap === null || !this.radius) return;

    const hexesHeight = this.hexHeight * (2 * this.radius + 1);
    const gapCompensation = this.radius * this.coordToPixel.f3 * this.gap;
    const padding = this.gap * 2 + gapCompensation;

    this.gridHeight = hexesHeight + padding;
  }

  setOffset(): void {
    if (!this.hexWidth) return;

    this.offset = {
      x: this.gridWidth / 2 - this.hexWidth / 2,
      y: this.gridHeight / 2 - this.hexHeight / 2,
    };
  }

  updateProperies(isNewRadius: boolean): void {
    if (!this.hexWidth) return;

    this.setHexHeight();

    this.setGridWidth();
    this.setGridHeight();

    this.setOffset();

    this.setStyleVariables(this.gridWidth, this.gridHeight);

    isNewRadius && this.setBackgroundHexCoords();
  }

  setBackgroundHexCoords(): void {
    if (!this.radius) return;

    this.backgroundHexCoords = [];

    for (let q = -this.radius; q <= this.radius; q++) {
      for (let r = Math.max(-this.radius, -q - this.radius); r <= Math.min(this.radius, -q + this.radius); r++) {
        // added "|| 0" to prevent "-0" values
        const s = -q - r || 0;
        this.backgroundHexCoords.push({ q, r, s });
      }
    }
  }

  applyAnimations(currState: HexData[]): HexData[] {
    return currState.map((hex) => {
      if (this.isNewHex(hex)) {
        const newHex: HexData = { ...hex, animation: 'zoom-in' };
        return newHex;
      }

      return this.updateExistingHex(hex);
    });
  }

  private isNewHex(hex: HexData): boolean {
    return !this.previousHexData.some((oldHex) => oldHex.id === hex.id);
  }

  private updateExistingHex(hex: HexData): HexData {
    const oldHex = this.previousHexData.find((oldHex) => oldHex.id === hex.id) || hex;

    if (isHexAEqualHexB(oldHex, hex)) return hex;

    const didMerge = oldHex.value !== hex.value;
    const nexHex: HexData = { ...hex, animation: didMerge ? 'merge' : 'move' };

    return nexHex;
  }
}
