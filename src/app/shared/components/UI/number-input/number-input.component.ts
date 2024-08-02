import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { parseNumberOrFloat } from '@app/shared/helpers';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
  @Input({ required: true }) label: string | undefined;
  @Input({ required: true, transform: (value: any) => parseNumberOrFloat(value) }) value: number = 0;
  @Input() step: number = 1;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild('input')
  inputRef!: ElementRef;

  setNewValue(value: number) {
    const minValue = Math.max(this.minValue ?? value, value);
    const maxValue = Math.min(this.maxValue ?? value, value);

    const newValue = minValue ^ value ^ maxValue;

    this.value = newValue;
    this.inputRef.nativeElement.value = newValue;
  }

  onInputChange(value: string): void {
    this.setNewValue(parseNumberOrFloat(value));
    this.valueChange.emit(this.value);
  }
}
