import { Component, OnInit, } from '@angular/core';
import { InternService } from '../../../service/intern.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-inters',
    templateUrl: './inters.component.html',
    styleUrls: ['./inters.component.css']
})
export class IntersComponent implements OnInit {

    constructor(private _internService: InternService,
        private _toast: ToastrService) { }
    is_editing_interns:Boolean = false;
    loading: Boolean = false;

    displayedColumns: Array<String> = ['depNo', 'name', 'rollNo', 'officer', 'start', 'end'];
    display_val: Array<String> = ["Deployment No.", 'Name', "Roll No.", "Officer", "Internship Start", "Internship End"];
    all_interns: Array<any> = [];

    ngOnInit() {
        this.get_all_interns();
    }

    get_all_interns() {
        this.loading = true;
        this._internService.showRegisterIntern().subscribe(
            res => {
                res.body.forEach(el => {
                    el.name = el.pInfo.name;
                    el.rollNo = el.pInfo.rollNo;
                    el.officer = el.repOfficer.name;
                    el.oDeptt = el.repOfficer.deptt;
                    el.start = el.start.substring(0, 10);
                    el.start = el.start.split('-').reverse().join('/');
                    el.end = el.end.substring(0, 10);
                    el.end = el.end.split('-').reverse().join('/');
                });
                this.all_interns = res.body;
                this.loading = false
            },
            err => { this._toast.error(err.message, 'Something went wrong!'); this.loading = false; }
        );
    }
}
