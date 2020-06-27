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
    const { name, email, phone, message } = this.persister.get('formState');

    this.form = new FormGroup({
      name: new FormControl(name),
      email: new FormControl(email),
      phone: new FormControl(phone),
      message: new FormControl(message)
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
