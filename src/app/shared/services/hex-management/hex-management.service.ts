import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HexCoordWithValue, HexData } from '@app/shared/interfaces';
import { HexManagementState } from './interfaces/hex-management-state';
import { hexagonIDGenerator, sortHexDataArray } from '@app/shared/helpers';
import { SERVER_ENDPOINT } from '@app/shared/constants';
import { environment } from '../../../../environments/environment';

const initialState: HexManagementState = {
  hexData: [],
  hexesToDelete: [],
  isLoading: true,
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

  resetState(): void {
    this.state.next(initialState);
  }

  setHexData(hexData: HexData[]): void {
    this.setState({ hexData: sortHexDataArray(hexData) });
  }

  setIsLoading(isLoading: boolean): void {
    if (this.getState().isLoading === isLoading) return;
    this.setState({ isLoading });
  }

  // One method to set both, to trigger just one update loop
  setHexDataAndHexesToDelete(hexData: HexData[], hexesToDelete: HexData[]): void {
    this.setState({ hexData: sortHexDataArray(hexData), hexesToDelete: sortHexDataArray(hexesToDelete) });
  }

  getHexData(): HexData[] {
    return this.getState().hexData;
  }

  private getNextHexID: ReturnType<typeof hexagonIDGenerator> = hexagonIDGenerator();

  private initializeHexIDGenerator(): void {
    if (this.getState().hexData.length !== 0) return;
    this.getNextHexID = hexagonIDGenerator();
  }

  private transformIntoHexData(hexCoordWithValues: HexCoordWithValue[]): HexData[] {
    return hexCoordWithValues.map<HexData>((hex) => ({ ...hex, id: this.getNextHexID() }));
  }

  getNewHexCoords(radius: number, userHexData: HexData[]): Observable<HexData[]> {
    this.setIsLoading(true);

    const url = `${this.serviceURL}/${radius}`;

    const timeout = setTimeout(() => {
      throw new Error(
        'Seems that the request is taking too long\nAs a web-based game it relies on your internet speed for communication between client and server',
      );
    }, 1500);

    return this.http.post<HexCoordWithValue[]>(url, JSON.stringify(userHexData), this.httpOptions).pipe(
      tap(() => this.initializeHexIDGenerator()),
      tap(() => clearTimeout(timeout)),
      map((response) => this.transformIntoHexData(response)),
    );
  }
}
