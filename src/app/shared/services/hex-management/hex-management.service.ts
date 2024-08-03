import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { HexCoord, HexCoordWithValue, HexData } from '@app/shared/interfaces';
import { HexManagementState } from './interfaces/hex-management-state';
import { hexagonIDGenerator, sortHexDataArray } from '@app/shared/helpers';
import { SERVER_ENDPOINT } from '@app/shared/constants';
import { environment } from '../../../../environments/environment';

const initialState: HexManagementState = {
  hexData: [],
  hexesToDelete: [],
  backgroundHexCoords: [],
  isAnimatingOrTransitioning: true,
};

@Injectable({
  providedIn: 'root',
})
export class HexManagementService {
  private baseURL = environment.SERVER_URL;
  private enpoint = SERVER_ENDPOINT.HEX_GRID_MANAGEMENT;
  private serviceURL = `${this.baseURL}/${this.enpoint}`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private readonly state = new BehaviorSubject<HexManagementState>(initialState);

  readonly state$: Observable<HexManagementState> = this.state.asObservable();

  constructor(private readonly http: HttpClient) {}

  private getState(): HexManagementState {
    return this.state.value;
  }

  private setState(newState: Partial<HexManagementState>): void {
    this.state.next({ ...this.getState(), ...newState });
  }

  setBackgroundHexCoords(hexCoords: HexCoord[]): void {
    this.setState({ backgroundHexCoords: hexCoords });
  }

  setHexData(hexData: HexData[]): void {
    this.setState({ hexData: sortHexDataArray(hexData) });
  }

  setIsAnimatingOrTransitioning(isAnimatingOrTransitioning: boolean): void {
    if (this.getState().isAnimatingOrTransitioning === isAnimatingOrTransitioning) return;
    this.setState({ isAnimatingOrTransitioning });
  }

  setHexDataAndHexesToDelete(hexData: HexData[], hexesToDelete: HexData[]): void {
    this.setState({ hexData: sortHexDataArray(hexData), hexesToDelete });
  }

  getHexData(): HexData[] {
    return this.getState().hexData;
  }

  private getNextHexID: ReturnType<typeof hexagonIDGenerator> = hexagonIDGenerator();

  private initializeHexIDGenerator(): void {
    if (this.getState().hexData.length === 0) {
      this.getNextHexID = hexagonIDGenerator();
    }
  }

  private transformIntoHexData(hexCoordWithValues: HexCoordWithValue[]): HexData[] {
    return hexCoordWithValues.map<HexData>((hex) => ({ ...hex, id: this.getNextHexID() }));
  }

  getNewHexCoords(radius: number, userHexData: HexData[]): Observable<HexData[]> {
    const url = `${this.serviceURL}/${radius}`;
    return this.http.post<HexCoordWithValue[]>(url, JSON.stringify(userHexData), this.httpOptions).pipe(
      tap(() => this.initializeHexIDGenerator()),
      map((response) => this.transformIntoHexData(response)),
    );
  }
}
