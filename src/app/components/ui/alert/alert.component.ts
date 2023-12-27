import { NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CustomersFacade } from '../../customers/data-access/customers.facade';
import { opacity } from '@app-shared/animations/animations';
import { delay, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAlert } from '../../customers/data-access/entities/customers.interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass, ButtonComponent, NgIf],
  templateUrl: './alert.component.html',
  animations: [opacity],
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  public customersFacade = inject(CustomersFacade);
  public data: WritableSignal<IAlert | null> = signal<IAlert | null>(null);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.customersFacade.alert$
    .pipe(takeUntilDestroyed()).subscribe({
      next: (value) => { 
        if (!value) return;
        this.data.set({
          text: value?.text,
          type: value?.type
        })
      },
    })
  }

  public delay(ms: number) {
    return of(null).pipe(delay(ms));
  }
  
  public close(): void {
    this.customersFacade.alert$.next(null);
    this.data.set(null);
    this.delay(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.customersFacade.removeComponent();
      this.customersFacade.navigate(['/customers'])
  });
  }
}
