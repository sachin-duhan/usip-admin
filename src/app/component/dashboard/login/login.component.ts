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
    show_interns_with_access: Boolean = true;
    constructor(
        private _internService: InternService,
        private _toast: ToastrService,
        private _login: LoginService
    ) { }

    all_interns: Array<any> = [];
    interns_with_Access: Array<any> = [];
    ngOnInit() {
        this.loading = true;
        this._internService.showRegisterIntern().subscribe(
            res => { this.all_interns = res.body; this.loading = false; },
            err => this._toast.error(err.message, 'Error!')
        );
        this.get_all_interns_with_accesss();
    }

    get_all_interns_with_accesss() {
        this.loading = true;
        this._login.getData().subscribe(res => {
            this.interns_with_Access = res.body;
            console.log(res);
            this.loading = false;
        })
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
        this._login.deleteIntern(data).subscribe(
            res => this._toast.success(res.messgae, 'Success')
            , err => this._toast.error(err.messgae, 'Failed'));
    }
}
