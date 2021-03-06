import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  backendHost = "http://localhost:3050/";
  statusRegster = false;

  signInForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get emailField(): AbstractControl {
    return this.signInForm.get('email') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.signInForm.get('password') as AbstractControl;
  }

  matcher = new MyErrorStateMatcher();


  loginIn() {
    this.httpClient.post(`${this.backendHost}login`, this.signInForm.value)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Iniciando sesión de manera correcta`, 'New Inntech');
          console.log('token: ', res)
          const token = res as string;
          sessionStorage.setItem('token', token);
          this.router.navigate(['/home']);
        } else {
          this.toastSvc.error(`Correo y/o contraseña incorrecta`, 'New Inntech');
        }
      })

  }
  goToRegister(){
    this.router.navigate(['']);
  }
}
