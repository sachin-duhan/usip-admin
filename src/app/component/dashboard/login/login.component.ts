import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { InternService } from '../../../service/intern.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class AccessComponent implements OnInit {
    loading: Boolean = false;
    private showDeleteButton: Boolean = false;
    constructor(
        private _internService: InternService,
        private _toast: ToastrService,
        private _login: LoginService
    ) { }

    all_interns: Array<any> = [];
    ngOnInit() {
        this.loading = true;
        this._internService.showRegisterIntern().subscribe(
            res => { this.all_interns = res.body; this.loading = false; },
            err => this._toast.error(err.message, 'Error!')
        );
    }

    // making login credentials
    allowAccess(data) {
        const intern = {
            userName: data.pInfo.email,
            adminAccessGiven: false,
            password: data._id,
            userDetails: data._id
        }
        console.log(data);
        return;
        this._login.makeLoginCredentials(intern).subscribe(res => {
            this._toast.success('Login credentials given to given!', 'Sucsess');
        }, err => {
            this._toast.error(err.error.message, 'Failed');
            console.log(err);
        });
    }

    deleteIntern(data) {
        this._login.deleteIntern(data).subscribe(res => {
            console.log(res);
            this._toast.success(res.messgae, 'Success');
        }, err => {
            this._toast.error(err.error.messgae, 'Failed');
            console.log(err);
        });
    }

    toggle(): void {
        this.showDeleteButton = !this.showDeleteButton;
    }
}
