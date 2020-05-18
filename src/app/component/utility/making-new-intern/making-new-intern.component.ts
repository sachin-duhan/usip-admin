import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OfficerService } from '../../../service/officer.service';
import { InternService } from "../../../service/intern.service";

import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-making-new-intern',
    templateUrl: './making-new-intern.component.html',
    styleUrls: ['./making-new-intern.component.css']
})
export class MakingNewInternComponent implements OnInit {
    show_interview_result: Boolean = true;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _officer: OfficerService,
        private _internService: InternService,
        private fb: FormBuilder,
        private _toast: ToastrService,
        public dialogRef: MatDialogRef<MakingNewInternComponent>
    ) { }
    all_officers: Array<any> = [];
    ngOnInit() {
        this.get_all_officers();
    }

    make_new_intern_form = this.fb.group({
        start: [''],
        end: [''],
        depNo: [''],
        repOfficer: [''],
    });

    get_all_officers() {
        this._officer.getOfficers().subscribe(
            res => this.all_officers = res.body
        )
    }

    submitForm() {
        let form_data = {
            pInfo: this.data.pInfo._id,
            interview: this.data._id,
            repOfficer: this.make_new_intern_form.get('repOfficer').value,
            depNo: this.make_new_intern_form.get('depNo').value,
            bankName: "Not filled",
            bankAc: "Not Filled",
            ifsc: 'Not Filled',
            start: this.make_new_intern_form.get('start').value,
            end: this.make_new_intern_form.get('end').value,
        };
        this._internService.addIntern(form_data).subscribe(
            res => {
                setTimeout(() => {
                    this._toast.success(res.message,"Success");
                }, 200);
                this.close();
            }, err => this._toast.error(err.message, "Error")
        )
    }

    close() {
        this.dialogRef.close();
    }
}
