import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameSetupService } from '@app/shared/services/game-setup';
import { HexManagementService } from '@app/shared/services/hex-management';
import { DIRECTION, DIRECTIONS } from '@app/shared/constants';
import { isSameHexArray, isHexAEqualHexB, CLOSEST_TO_BORDER, sortHexDataArray } from '@app/shared/helpers';
import { HexCoord, HexData } from '@app/shared/interfaces';
import { Direction, DirectionKey, HexCoordKey, ValueQuantityMap, ValueQuantityPair } from '@app/shared/types';
import { MergeResult } from './types';
import { ControlButtonComponent } from '../control-button/';
import { DesktopBreakpointDirective } from '@app/shared/directives';

@Component({
  selector: 'app-game-control',
  standalone: true,
  imports: [ControlButtonComponent, DesktopBreakpointDirective],
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.scss',
})
export class GameControlComponent implements OnInit, OnDestroy {
  @Input({ required: true }) radius!: number;
  @Input() isLoading!: boolean;
  @Input() hexData: HexData[] = [];

  get maxHexCount(): number {
    return 1 + 3 * this.radius * (this.radius + 1);
  }

  private hexManagementubscription: Subscription | undefined;

  ngOnInit(): void {
    this.unsubscribeHexManagement();
    if (this.hexManagementService.getHexData().length === 0) {
      this.hexManagementubscription = this.setNextTurnHexData();
    }
  }

  private unsubscribeHexManagement(): void {
    if (this.hexManagementubscription) {
      this.hexManagementubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeHexManagement();
  }

  constructor(
    private readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
  ) {}

  move(directionKey: DirectionKey | undefined): void {
    if (!directionKey) return;
    if (this.isLoading) return;
    this.performMove(DIRECTION[directionKey]);
  }

  performMove(direction: Direction): void {
    let tempHexData: HexData[] = [...this.hexData];
    let hexesToDelete: HexData[];

    tempHexData = this.processMove(direction, tempHexData);
    [tempHexData, hexesToDelete] = this.processMerge(direction, tempHexData);
    tempHexData = this.processMove(direction, tempHexData);
    tempHexData = sortHexDataArray(tempHexData);

    const isSameHexData = isSameHexArray(tempHexData, this.hexData);

    if (isSameHexData) return;

    this.setNextTurnHexData(
      tempHexData,
      hexesToDelete.map<HexData>((hex) => ({ ...hex, animation: 'delete' })),
    );
  }

  processMove(direction: Direction, hexDataArray: HexData[]): HexData[] {
    if (!this.canMove(direction, hexDataArray)) return hexDataArray;

    const processedHexes: HexData[] = [];

    return this.processMove(
      direction,
      hexDataArray.map((hex, i, initialArray) => {
        const comparisonArray = processedHexes.concat(initialArray.slice(i));

        let newHex: HexData = { ...hex };

        while (true) {
          const neighborCoord = this.getNeighborCoord(newHex, direction);
          const isInRange = this.isHexInRange(neighborCoord);

          if (!isInRange) break;

          const neighbor = this.getHex(neighborCoord, comparisonArray);

          if (neighbor) break;

          newHex = { ...newHex, ...neighborCoord };
        }

        processedHexes.push(newHex);
        return newHex;
      }),
    );
  }

  canMove(direction: Direction, hexDataArray: HexData[]): boolean {
    return hexDataArray.some((hex) => {
      const neighborCoord = this.getNeighborCoord(hex, direction);
      return this.isHexInRange(neighborCoord) && !this.getHex(neighborCoord, hexDataArray);
    });
  }

  getNeighborCoord(hexA: HexCoord | HexData, direction: Direction): HexCoord {
    return this.addHexCoord(hexA, DIRECTIONS[direction]);
  }

  getHex(hexCoord: HexCoord | HexData, hexDataArray: HexData[]): HexData | undefined {
    return hexDataArray.find((hexData) => {
      return isHexAEqualHexB(hexData, hexCoord);
    });
  }

  isHexInRange(hex: HexCoord | HexData): boolean {
    const hexCoordKeys: HexCoordKey[] = ['q', 's', 'r'];
    const hasViolatedRange = hexCoordKeys.some((key) => Math.abs(hex[key]) > this.radius);

    return !hasViolatedRange;
  }

  addHexCoord(hexA: HexCoord | HexData, hexB: HexCoord | HexData): HexCoord {
    return {
      q: hexA.q + hexB.q,
      r: hexA.r + hexB.r,
      s: hexA.s + hexB.s,
    };
  }

  processMerge(direction: Direction, hexDataArray: HexData[]): MergeResult {
    const consumedHexes: HexData[] = [];
    const mergedHees: HexData[] = [];
    const result: HexData[] = [];

    hexDataArray.sort(CLOSEST_TO_BORDER[direction]).forEach((hex, i, initialArray) => {
      const comparisonArray = result.concat(initialArray.slice(i));

      let newHex: HexData = { ...hex };

      const neighborCoord = this.getNeighborCoord(newHex, direction);
      const neighbor = this.getHex(neighborCoord, comparisonArray);

      if (!neighbor) return result.push(newHex);

      const didMerge = mergedHees.some((mHex) => mHex.id === neighbor.id);

      const isSameValue = newHex.value === neighbor.value;

      if (!isSameValue || didMerge) return result.push(newHex);

      newHex = { ...newHex, value: newHex.value * 2 };
      consumedHexes.push(neighbor);
      mergedHees.push(newHex);

      return result.push(newHex);
    });

    const hexesToDelete = this.hexData.flatMap((hex) =>
      consumedHexes.some((mergedHex) => mergedHex.id === hex.id) ? hex : [],
    );

    return [result.filter((hex) => !consumedHexes.includes(hex)), hexesToDelete];
  }

  getDuplicateHexValues(): HexData['value'][] {
    return Array.from<ValueQuantityPair>(
      this.hexData.reduce<ValueQuantityMap>((acc, currHex) => {
        if (acc.has(currHex.value)) {
          acc.set(currHex.value, acc.get(currHex.value)! + 1);
        } else {
          acc.set(currHex.value, 1);
        }
        return acc;
      }, new Map<number, number>()),
    ).flatMap((vqPair) => (vqPair[1] > 1 ? vqPair[0] : []));
  }

  isGameOver(hexData: HexData[]): boolean {
    if (hexData.length !== this.maxHexCount) return false;

    const duplicateHexValues = this.getDuplicateHexValues();

    if (!duplicateHexValues.length) return true;

    const potentialMergeHexes = hexData.filter((hex) => duplicateHexValues.includes(hex.value));

    const canMerge = potentialMergeHexes.some((hex) => {
      const neighborCoords = Object.values(DIRECTION)
        .map((direction) => this.getNeighborCoord(hex, direction))
        .filter((hex) => this.isHexInRange(hex));

      const neighbors = neighborCoords
        .map((neighborCoord) => this.getHex(neighborCoord, potentialMergeHexes))
        .filter((el) => el !== undefined);

      return neighbors.some((neighbor) => neighbor && neighbor.value === hex.value);
    });

    return !canMerge;
  }

  isWin(hexData: HexData[]): boolean {
    return hexData.some((hex) => hex.value === 2048);
  }

  setNextTurnHexData(thisTurnHexData: HexData[] = [], hexesToDelete: HexData[] = []): Subscription {
    this.unsubscribeHexManagement();

    return this.hexManagementService.getNewHexCoords(this.radius, thisTurnHexData).subscribe((newHexData) => {
      const nextTurnHexData = [...thisTurnHexData, ...newHexData];

      this.hexManagementService.setHexDataAndHexesToDelete(nextTurnHexData, hexesToDelete);

      if (this.isWin(thisTurnHexData)) return this.gameSetupService.setGameState('win');
      if (this.isGameOver(nextTurnHexData)) return this.gameSetupService.setGameState('game-over');
    });
  }
}
