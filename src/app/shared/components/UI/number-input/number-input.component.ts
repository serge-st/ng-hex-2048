import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
  @Input({ required: true }) label: string | undefined;
  @Input() value: number | undefined = 0;
  @Input() step: number = 1;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Output() valueChange = new EventEmitter<number>();
  isError: boolean = false;
  errorText: string = '';

  setNewValue(value: number): void {
    this.validate(value);
    if (this.isError) return;

    const minValue = Math.max(this.minValue ?? value, value);
    const maxValue = Math.min(this.maxValue ?? value, value);

    const newValue = minValue ^ value ^ maxValue;

    this.value = newValue;
  }

  onInputChange(value: string): void {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return;

    this.setNewValue(parsedValue);
    this.valueChange.emit(this.value);
  }

  validate(value: number): void {
    if (this.minValue && value < this.minValue) {
      this.setError(`Value should be ${this.minValue} or more`);
    } else if (this.maxValue && value > this.maxValue) {
      this.setError(`Value should be ${this.maxValue} or less`);
    } else {
      this.clearError();
    }
  }

  private setError(message: string): void {
    this.isError = true;
    this.errorText = message;
  }

  private clearError(): void {
    this.isError = false;
    this.errorText = '';
  }
}
