import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {}
}
