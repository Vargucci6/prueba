import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent implements OnInit {

  data_user: Usuarios[];
  backendHost = "http://localhost:3050/";
  mostrar = false;

  dataSource: Usuarios[];
  columnsToDisplay = ['email'];
  expandedElement: Usuarios | null;

  constructor(private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) { }

  ngOnInit(): void {



    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);

    this.httpClient.post(`${this.backendHost}post`, {}, { headers: httpHeaders })
      .subscribe(res => {
        if (res) {
          this.mostrar = true;
        } else {
          this.router.navigate(['/login']);
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'New Inntech');
          this.mostrar = false;
        }
      });


    this.httpClient.get<Usuarios[]>(`${this.backendHost}customers`)
      .subscribe(res => {
        if (res) {
          this.dataSource = res;
          console.log(this.data_user)
        } else {
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'New Inntech');
        }
      });
  }
  signOut(){
    this.router.navigate(['/login']);
    sessionStorage.setItem('token', "");
    this.toastSvc.success(`Sesió cerrada correctamente`, 'New Inntech');
  }

}

export interface Usuarios {
  id_user: number,
  name: string,
  email: string,
  password: string
}
