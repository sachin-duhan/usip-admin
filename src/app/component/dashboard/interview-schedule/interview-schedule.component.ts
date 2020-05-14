import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../../service/register.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-interview-schedule',
    templateUrl: './interview-schedule.component.html',
    styleUrls: ['./interview-schedule.component.css']
})
export class InterviewScheduleComponent implements OnInit {
    loading: Boolean = false;
    show_form: Boolean = false;

    constructor(
        private _registerationService: RegisterService, private _toast: ToastrService,
        private fb: FormBuilder,
    ) { }

    qualified_applications: Array<any> = [];
    displayedColumns: Array<String> = ['name', 'rollNo', 'marks', 'phone', 'domain'];
    display_val: Array<String> = ["Name", "Roll No.", "CGPA", 'Phone', "Domain"];

    ngOnInit() {
        this.get_qualified();
    }

    get_qualified() {
        this.loading = true;
        this._registerationService.get_all_qualified_applications()
            .subscribe(res => { this.qualified_applications = res.body; this.loading = false; });
    }

    /** selected interns */
    selected_applications: Array<String> = [];
    update_interns() {
        if (this.selected_applications.length <= 0) return;
        console.log(this.selected_applications);
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success("Intern updated Successfully", "Success");
        else this._toast.warning(res.message, msg);
    }

    interviewScheduleForm = this.fb.group({
        venue: [''],
        slot: [''],
        date: [Date.now()]
    });

    submitForm(): void {
        const interview_data = {
            venue_details: this.interviewScheduleForm.get('venue').value,
            slot_details: this.interviewScheduleForm.get('slot').value,
            interview_date: this.interviewScheduleForm.get('date').value,
        };
        console.log(interview_data);
    }

}
