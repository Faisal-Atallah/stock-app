import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent {
  disabled = input(false);
  toggleStock = output<boolean>();

  private _changeDetectorRef = inject(ChangeDetectorRef);

  /**
   * On Toggle Change
   */
  onToggleChange(): void {
    const newState = computed(() => !this.disabled());
    this.toggleStock.emit(newState());
    this._changeDetectorRef.markForCheck();
  }



}
