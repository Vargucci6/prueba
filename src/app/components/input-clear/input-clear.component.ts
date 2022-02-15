import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, AbstractControl, ControlContainer } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss'],
  viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }
]
})
export class InputClearComponent implements OnInit {

  @Input() value: string = "";
  @Input() title: string = "";
  @Input() type: string = "text";
  @Input() class: string = "";
  @Input() formControlName: any;
  @Input() icon: string = "visibility";
  @Output() onClick = new EventEmitter<any>();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

}
