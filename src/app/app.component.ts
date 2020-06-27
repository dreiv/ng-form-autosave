import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, auditTime, tap } from 'rxjs/operators';

import { PersistanceService } from './persistance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private unsubscribe = new Subject<void>();

  constructor(private persister: PersistanceService) {
    const formState = this.persister.get('formState');

    this.form = new FormGroup({
      name: new FormControl(formState.name),
      email: new FormControl(formState.email),
      phone: new FormControl(formState.phone),
      message: new FormControl(formState.message)
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        auditTime(1000),
        tap((formValue) => this.persister.set('formState', formValue)),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => console.log('Saved'));
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  onSubmit(): void {
    alert('Form Submitted!');
    this.form.reset();
  }
}
