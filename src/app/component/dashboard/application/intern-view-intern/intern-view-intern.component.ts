import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { InterviewService } from "../../../../service/interview.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-intern-view-intern',
    templateUrl: './intern-view-intern.component.html',
    styleUrls: ['./intern-view-intern.component.css']
})
export class InternViewInternComponent implements OnInit {

    constructor(private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _interviewService: InterviewService,
        private _toast: ToastrService,
        public dialogRef: MatDialogRef<InternViewInternComponent>
    ) { }

    internForm = this.fb.group({
        comment: [this.data.interview_comment], // setting value
        marks: [this.data.interview_marks, Validators.max(100)],
        interview_attendence: [this.data.interview_attendence]
    });

    private loading: Boolean = false;
    public applicant = { ...this.data }; // copy of the original!!

    ngOnInit() { }

    submitForm(): void {
        this.loading = !this.loading;
        const marks = this.internForm.get('marks').value;
        const user = {
            interview_comment: this.internForm.get('comment').value,
            interview: true,
            interview_marks: marks,
            interview_attendence: marks > 0 ? true : this.internForm.get('interview_attendence').value,
            slot_details: this.applicant.slot_details,
            venue_details: this.applicant.venue_details,
            interview_date: this.applicant.interview_date
        };
        this._interviewService.update_status_of_applicants_interview(user, this.applicant._id).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        this.loading = !this.loading;
        if (res.success) setTimeout(() => {
            this._toast.success(res.message, "Success");
        }, 100);
        else setTimeout(() => {
            this._toast.warning(res.message, msg);
        }, 100);
        this.close();
    }

}
