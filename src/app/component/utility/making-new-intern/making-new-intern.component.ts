import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OfficerService } from '../../../service/officer.service';

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
            start: this.make_new_intern_form.get('start').value,
            end: this.make_new_intern_form.get('end').value,
            depNo: this.make_new_intern_form.get('depNo').value,
            repOfficer: this.make_new_intern_form.get('repOfficer').value,
            interview: this.data._id,
            pInfo: this.data.pInfo._id
        };
        console.log(form_data);
        setTimeout(() => {
            this._toast.success("Intern created successfully!!");
        }, 200);
        this.close();
    }

    close() {
        this.dialogRef.close();
    }
}
