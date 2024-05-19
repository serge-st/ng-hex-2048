import { Component } from '@angular/core';
import { StyleVariables } from './interfaces/style-variables';
import Big from 'big.js';

@Component({
    selector: '',
    template: '',
})
export abstract class GridUtilityComponent {
    abstract hexWidth: number;
    // abstract hexHeight: number;
    abstract hexHeight: Big;
    abstract styleVariables: StyleVariables

    coordToPixel = {
        // f0: 3 / 2,
        f0: Big(3).div(2),
        // f1: 0,
        f1: Big(0),
        // f2: Math.sqrt(3) / 2,
        f2: Big(3).sqrt().div(2),
        // f3: Math.sqrt(3),
        f3: Big(3).sqrt(),
    }

    // getPixelString(value: number): string {
    getPixelString(value: string): string {
        return value + 'px';
    }

    setHexHeight(): void {
        // this.hexHeight = (Math.sqrt(3) * (this.hexWidth / 2));
        this.hexHeight = Big(3).sqrt().times(this.hexWidth).div(2);
    }

    // setStyleVariables(width: number, height: number, xCoord?: number, yCoord?: number): void {
    setStyleVariables(width: string, height: string, xCoord?: string, yCoord?: string): void {
        this.styleVariables = {
            width: this.getPixelString(width),
            height: this.getPixelString(height),
            xCoord: xCoord ? this.getPixelString(xCoord) : '',
            yCoord: yCoord ? this.getPixelString(yCoord) : '',
        };
    }
}
