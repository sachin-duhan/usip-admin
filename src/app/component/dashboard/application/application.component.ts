import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../.././../service/register.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

    show_table: Boolean = false;
    private loading: Boolean = false;

    constructor(private _registerService: RegisterService, private _toast: ToastrService) { }

    public all_applications: Array<any> = [];
    public qulified_applications: Array<any> = [];
    public not_qualified_applications: Array<any> = [];
    displayedColumns: Array<String> = ['name', 'rollNo', 'marks', 'phone', 'domain', 'isQualified'];
    display_val: Array<String> = ["Name", "Roll No.", "CGPA", 'Phone', "Domain", "Qualified"];

    ngOnInit() {
        this.loading = !this.loading;
        this._registerService.showRegisterations().subscribe(
            res => {
                this.all_applications = res.body;
                this.all_applications.forEach(el => {
                    if (el.isQualified) this.qulified_applications.push(el);
                    else this.not_qualified_applications.push(el);
                });
                this.loading = !this.loading;
            },
            err => {
                this.handle_response(err, false);
                this.loading = !this.loading;
            }
        );
    }

    /** selected interns */
    selectedInterns: Array<String> = [];
    update_interns() {
        if (this.selectedInterns.length <= 0) return;
        this._registerService.qualify_applications(this.selectedInterns).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        );
    }

    disqualify_intern(id: String, index: number) {
        this._registerService.disqualify_an_application(id).subscribe(
            res => {
                this.handle_response(res, true);
                let temp = this.qulified_applications.splice(index, 1); // removing from front-end UI!
                this.not_qualified_applications.push(temp[0]); // adding removed element to not_qualified_applications!!
            },
            err => this.handle_response(err, false)
        );
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success("Intern updated Successfully", "Success");
        else this._toast.warning(res.message, msg);
    }
}
