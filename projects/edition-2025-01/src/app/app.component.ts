import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, merge, mergeMap } from 'rxjs';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { MyChildComponent } from './my-child/my-child.component';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, MyChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'edition-2025-01';
  titulo = signal('Edition 2025-01');
  title$ = new BehaviorSubject('edition 2025-01 RxJs');

  name = 'Saul';
  lastName = 'Goodman';
  fullName = this.name + ' ' + this.lastName;

  nombre = signal('Kim');
  apellido = signal('Wexler');
  nombreCompleto = computed(() => this.nombre() + ' ' + this.apellido());

  name$ = new BehaviorSubject('Walter');
  lastName$ = new BehaviorSubject('Jackson');
  fullName$ = combineLatest([this.name$, this.lastName$]).pipe(
    map(([name, lastName]) => name + ' ' + lastName)
  );

  lista = signal([1, 2, 3]);

  updatePrimitives() {
    this.title = 'edition version 2025-01 updated';
    this.name = 'John';
    this.lastName = 'Doe';
    this.fullName = this.name + ' ' + this.lastName;
  }

  updateRxJs() {
    this.name$.next('Jack');
    this.title$.next('Edition 2025-01 RxJs Updated');
    this.lastName$.next('White');

    const nombre$ = toObservable(this.nombre);
  }

  updateTitulo() {
    this.titulo.set('Edición 2025-01 Mitocode');
  }
  updateNombre() {
    this.nombre.set('Jesse');

    const name = toSignal(this.name$);
  }

  updateApellido() {
    this.apellido.set('Pinkman');
  }

  updateList() {
    this.lista().push(4);
  }

  constructor() {
    effect(() => {
      console.log("Signal 'Titulo' cambió a: " + this.titulo());
    });

    effect(() => {
      console.log("Signal 'Nombre' cambió a: " + this.nombre());
    });

    effect(() => {
      console.log("Signal 'Apellido' cambió a: " + this.apellido());
    });

    this.name$
      .pipe(takeUntilDestroyed())
      .subscribe((val) => console.log('name$ cambio a: ' + val));
  }
}
