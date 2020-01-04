import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: Boolean = false;
  constructor(private fb: FormBuilder,
    private _login: LoginService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if(this._login.loggedIn())this.router.navigate['/'];
   }
  // tslint:disable-next-line: member-ordering
  loginForm = this.fb.group({
    userName: [''],
    password: ['']
  });

  submit(): void {
    this.loading = !this.loading;

    this._login.postData(this.loginForm.value).subscribe(
      res => {
        // console.log(res.token);
        jwt_decode(res.token);
        localStorage.setItem('token', res.token);
        this.loading = !this.loading;
        if (jwt_decode(res.token).admin) this.router.navigate(['/admin/dashboard']);
        else this.router.navigate(['usip/intern']);
      },
      err => {
        this.loading = !this.loading;
        this.toast.error('Login credentials not valid', 'Forbidden');
      }
    );
  }
}
