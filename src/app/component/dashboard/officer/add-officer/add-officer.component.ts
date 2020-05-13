import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { OfficerService } from '../../../../service/officer.service';
@Component({
    selector: 'app-add-officer',
    templateUrl: './add-officer.component.html',
    styleUrls: ['./add-officer.component.css']
})
export class AddOfficerComponent implements OnInit {
    loading: Boolean = false;
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AddOfficerComponent>,
        private _officerService: OfficerService,
        private _toast: ToastrService
    ) { }

    officerForm = this.fb.group({
        name: [this.data.name],
        phone: [this.data.phone, Validators.min(1000000000)],
        deptt: [this.data.deptt],
        email: [this.data.email],
        checked: ['', Validators.required]
    });

    ngOnInit() { }
    submitForm(): void {
        this.loading = !this.loading;
        const officer = {
            name: this.officerForm.get('name').value,
            phone: this.officerForm.get('phone').value,
            deptt: this.officerForm.get('deptt').value,
            email: this.officerForm.get('email').value
        };
        if (this.data.method === 'post') {
            this._officerService.createOfficer(officer).subscribe(
                res => {
                    setTimeout(() => {
                        this._toast.success("Officer created successfully");
                    }, 100);
                    this.loading = !this.loading;
                    this.dialogRef.close();
                },
                err => {
                    console.log(err);
                    this.loading = !this.loading;
                    this._toast.error(err.error.message, 'Bad request');
                }
            );
        } else {
            console.log('update kro');
        }
    }

    update_officer(officer) {

    }
}
