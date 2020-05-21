import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InternService } from "../../../service/intern.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-bank-details-form',
    templateUrl: './bank-details-form.component.html',
    styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _bankService: InternService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<BankDetailsFormComponent>,
        private _toast: ToastrService) { }

    ngOnInit() { }

    bankForm = this.fb.group({
        bankName: [this.data.bankName],
        bankAc: [this.data.bankAc],
        ifsc: [this.data.ifsc],
        email: [this.data.email],
        phone: [this.data.phone],
    });

    updateDetails() {
        console.log(this.bankForm.value);
        this._bankService.update_intern_bank_details(this.data._id, this.data).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        )
    }

    handle_response(res, error: Boolean) {
        console.log(res);
        let msg = error ? "Error" : "Warning";
        setTimeout(() => {
            if (res.success) this._toast.success(res.message, "Success");
            else this._toast.warning(res.message, msg);
        }, 100);
        this.dialogRef.close();
    }
}
