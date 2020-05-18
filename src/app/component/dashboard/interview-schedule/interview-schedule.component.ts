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
    show_applications_on_frontend: Array<any> = []; // this will be used to display values!!

    is_updating_scheduled_interviews: Boolean = false;
    is_creating_inteviews: Boolean = false;

    constructor(
        private _registerationService: RegisterService, private _toast: ToastrService,
        private fb: FormBuilder,
        private _interviewService: InterviewService
    ) { }

    /**data holder for display*/
    qualified_applications: Array<any> = [];
    /**end of data holder for display*/

    /**data for the table here!! */
    upcoming_interviews: Array<any> = [];
    displayedColumns: Array<String> = ['name', 'marks', 'rollNo', 'interview_date', 'venue_details', 'slot_details'];
    display_val: Array<String> = ["Name", 'CGPA', "Roll Number", "Interview Date", 'Venue', "Slot"];
    /**end of the data table!!*/

    ngOnInit() {
        this.get_upcoming_interviews();
        this.get_qualified();
    }

    get_upcoming_interviews() {
        this.loading = true;
        this._interviewService.get_all_upcoming_interviews().subscribe(
            res => {
                this.upcoming_interviews = res.body;
                // processing data for proper display in table!!
                this.upcoming_interviews.forEach(el => {
                    el.name = el.pInfo.name;
                    el.rollNo = el.pInfo.rollNo;
                    el.marks = el.pInfo.marks;
                    el.domain = el.pInfo.domain;
                    el.branch = el.pInfo.branch;
                    el.phone = el.pInfo.phone;
                    el.email = el.pInfo.email;
                    el.pInfo = undefined;
                    el.interview_date = el.interview_date.substring(0, 10);
                    el.interview_date = el.interview_date.split('-').reverse().join('/');
                });
                this.loading = false;
            }
        )
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
            this.show_applications_on_frontend = this.upcoming_interviews;
            this.is_updating_scheduled_interviews = true;
        }
    }

    /** selected interns */
    selected_applications: Array<String> = [];
    // contains all selected list of the applications!!
    update_interviews(data) {
        console.log('updating things!');
        console.log(data);
        // window.alert("just check this once in backend!");
        // return;
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

        if (this.is_updating_scheduled_interviews) this.update_interviews(interview_data);
        else this._interviewService.schedule_interview_in_BULK(interview_data).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        )
    }

    handle_response(res, error: Boolean) {
        // console.log(res);
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success(res.message, "Success");
        else this._toast.warning(res.message, msg);
    }

    is_applicant_have_Schedule(id): Boolean {
        if (this.upcoming_interviews.find(el => el.pInfo == id)) return true;
        return false;
    }
}
