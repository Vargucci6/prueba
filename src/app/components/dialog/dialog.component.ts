import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  editForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) {
  }

  get nameField(): AbstractControl {
    return this.editForm.get('name') as AbstractControl;
  }
  get emailField(): AbstractControl {
    return this.editForm.get('email') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.editForm.get('password') as AbstractControl;
  }



  ngOnInit(): void {
    let name = sessionStorage.getItem('name') as string;
    let email = sessionStorage.getItem('email') as string;
    let password = sessionStorage.getItem('password') as string;
    this.editForm = this.fb.group({
      name: [`${name}`, Validators.required],
      email: [`${email}'`, [Validators.required, Validators.email], /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i],
      password: [`${password}`, [Validators.required, Validators.minLength(8)]]
    });
  }

  functioncall() {

  }

}
