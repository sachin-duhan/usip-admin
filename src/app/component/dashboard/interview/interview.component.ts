import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { InternViewInternComponent } from '../application/intern-view-intern/intern-view-intern.component';
import { MakingNewInternComponent } from "../../utility/making-new-intern/making-new-intern.component";
import { RegisterService } from '../.././../service/register.service';
import { InterviewService } from "../../../service/interview.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html',
    styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

    showDeleteButton: Boolean = false;
    minimum_marks: number = 70;
    show_marks_update_form: Boolean = true;
    temp_minimum_marks: number = this.minimum_marks;
    conducting_interview: Boolean = true;

    constructor(
        private dialog: MatDialog,
        private _registerService: RegisterService,
        private _toast: ToastrService,
        private _interviewService: InterviewService
    ) { }

    loading: Boolean = false;

    displayedColumns: Array<string> = ['name', 'rollNo', 'marks', 'domain', 'interview', 'update'];

    qualified_applicants_above_set_marks: Array<any> = [];
    all_upcoming_interviews: Array<any> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource([]);

    ngOnInit() {
        this.loading = !this.loading;
        this._interviewService.get_all_upcoming_interviews().subscribe(
            res => {
                this.all_upcoming_interviews = res.body;
                this.dataSource = new MatTableDataSource(res.body);
                setTimeout(() => this.dataSource.paginator = this.paginator);
                this.loading = !this.loading;
            },
            err => {
                console.log(err);
                this.loading = !this.loading;
            }
        );
    }

    open_interview_modal(data): void {
        this.dialog.open(InternViewInternComponent, {
            width: "98%",
            height: "98%",
            autoFocus: true,
            disableClose: true,
            data: data
        });
    }

    make_new_intern_modal(data): void {
        this.dialog.open(MakingNewInternComponent, {
            disableClose: true,
            data: data
        });
    }

    update_marks() {
        this.minimum_marks = this.temp_minimum_marks;
        this.show_marks_update_form = !this.show_marks_update_form;
        this.conducting_interview_handler(false);
    }

    conducting_interview_handler(update: Boolean) { // this boolean value is for the display chanage!! 
        this.qualified_applicants_above_set_marks = [];
        if (this.conducting_interview || !update) {
            this.all_upcoming_interviews.forEach(el => {
                if (el.interview_marks >= this.minimum_marks)
                    this.qualified_applicants_above_set_marks.push(el);
            });
            this.dataSource = new MatTableDataSource(this.qualified_applicants_above_set_marks);
        }
        else this.dataSource = new MatTableDataSource(this.all_upcoming_interviews);
        if (update) this.conducting_interview = !this.conducting_interview; // show the change in the front-end!
    }

    delete_application(data): void {
        let v = confirm('Are you sure! ' + data.name + ' will be deleted');
        if (v) {
            this._registerService.deleteApplication(data._id).subscribe(res => {
                this._toast.success(res.messgae, 'Success');
            }, err => {
                this._toast.error('can\'t delete this application', 'Sorry!');
            });
        }
    }
}
