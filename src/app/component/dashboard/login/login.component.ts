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
    showDeleteButton: Boolean = false;
    updating_password_value: String = '';
    show_update_input_index: number = -1;
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
            this.loading = false;
        })
    }
    // making login credentials
    allowAccess(data) {
        const intern = {
            userName: data.pInfo.email,
            adminAccessGiven: false,
            password: "usip_intern",
            userDetails: data._id
        }
        this._login.makeLoginCredentials(intern)
            .subscribe(res => this.handle_response(res, true),
                err => this.handle_response(err, false));
    }

    update_password(id) {
        this.updating_password_value.trim();
        this.show_update_input_index = -1;
        this.updating_password_value = '';
        if (!this.updating_password_value || this.updating_password_value == '') {
            this._toast.warning("Enter a valid password", "Not Updated!");
            return;
        }
        let httpData = { newPassword: this.updating_password_value }
        this._login.update_password_by_admin(id, httpData)
            .subscribe(res => this.handle_response(res, true),
                err => this.handle_response(err, false));
    }

    deleteIntern(id, index: number) {
        this._login.deleteIntern(id).subscribe(res => {
            this.handle_response(res, true);
            this.interns_with_Access.splice(index, 1);
        }, err => this.handle_response(err, false));
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success(res.message, "Success");
        else this._toast.warning(res.message, msg);
    }

}
