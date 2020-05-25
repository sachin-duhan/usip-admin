import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../service/register.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
@Component({
    selector: 'app-bank-details',
    templateUrl: './bank-details.component.html',
    styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
    public date;
    constructor(
        private _register: RegisterService,
        private _toast: ToastrService,
        private dialogRef: MatDialogRef<BankDetailsComponent>
    ) { }

    public loading: Boolean = false;
    public bankDetails = undefined;
    public open: Boolean = false;

    ngOnInit() {
        this.loading = !this.loading;
        this._register.get_all_bank_or_applications('bank').subscribe(res => {
            if (res.body.length && res.body.length == 0) this.open = false;
            else {
                this.bankDetails = res.body[0];
                this.open = this.bankDetails.isOpen ? this.bankDetails.isOpen : false;
            }
            this.loading = !this.loading;
        });
    }

    closeBank(id): void {
        this._register.CloseApplication({ id: id }, 'bank').subscribe(res => {
            setTimeout(() => {
                this._toast.success(res.message, 'Done');
                this.dialogRef.close();
            }, 100);
        }, err => this._toast.error(err.message, 'BAD request'));
    }

    openApplication(): void {
        if (!this.date) {
            this._toast.warning('Can\'t open application without Date');
            return;
        }
        this._register.OpenApplication({ end: this.date }, 'bank').subscribe(res => {
            setTimeout(() => {
                this._toast.success(res.message, 'Congratulations');
                this.dialogRef.close();
            }, 100);
        }, err => { this._toast.error(err.message, 'Error'); console.log(err) });
    }

    close() {
        this.dialogRef.close();
    }
}