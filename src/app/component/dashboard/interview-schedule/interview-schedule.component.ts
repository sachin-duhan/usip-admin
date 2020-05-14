import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../../service/register.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

import { InterviewService } from "../../../service/interview.service";

@Component({
    selector: 'app-interview-schedule',
    templateUrl: './interview-schedule.component.html',
    styleUrls: ['./interview-schedule.component.css']
})
export class InterviewScheduleComponent implements OnInit {
    loading: Boolean = false;
    show_form: Boolean = false;
    is_updating_scheduled_interviews: Boolean = false;

    constructor(
        private _registerationService: RegisterService, private _toast: ToastrService,
        private fb: FormBuilder,
        private _interviewService: InterviewService
    ) { }

    qualified_applications: Array<any> = [];
    show_applications_on_frontend: Array<any> = []; // this will be used to display values!!
    scheduled_inetrview: Array<any> = [];

    displayedColumns: Array<String> = ['name', 'rollNo', 'marks', 'phone', 'domain'];
    display_val: Array<String> = ["Name", "Roll No.", "CGPA", 'Phone', "Domain"];

    ngOnInit() {
        this.get_qualified();
    }

    get_qualified() {
        this.loading = true;
        this._registerationService.get_all_qualified_applications()
            .subscribe(res => {
                this.qualified_applications = res.body;
                this.show_applications_on_frontend = this.qualified_applications;
                this.loading = false;
            });
    }

    update_click_handler() {
        if (this.is_updating_scheduled_interviews) {
            this.show_applications_on_frontend = this.qualified_applications;
            this.is_updating_scheduled_interviews = false;
        }
        else {
            this.loading = true;
            this._interviewService.get_all_upcoming_interviews().subscribe(
                res => {
                    console.log(res);
                    this.scheduled_inetrview = res.body || [];
                    this.loading = false;
                    this.show_applications_on_frontend = this.scheduled_inetrview;
                    this.is_updating_scheduled_interviews = true;
                },
                err => this.handle_response(err, false)
            )
        }
    }

    /** selected interns */
    selected_applications: Array<String> = [];
    // contains all selected list of the applications!!
    update_interviews(data) {
        this._interviewService.update_interviews_in_bulk(data).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        )
    }

    interviewScheduleForm = this.fb.group({
        venue: [''],
        slot: [''],
        date: [Date.now()]
    });

    submitForm() {
        if (this.selected_applications.length == 0) {
            this._toast.warning("Kindly select atleast one application");
            return;
        }

        let interview_data = {
            venue_details: this.interviewScheduleForm.get('venue').value,
            slot_details: this.interviewScheduleForm.get('slot').value,
            interview_date: this.interviewScheduleForm.get('date').value,
            interns: this.selected_applications
        };

        window.alert('Is bulk ready in backend?? you might get error');
        if (this.is_updating_scheduled_interviews) this.update_interviews(interview_data);
        else this._interviewService.schedule_interview_in_BULK(interview_data).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        )
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success("Intern updated Successfully", "Success");
        else this._toast.warning(res.message, msg);
    }

}
