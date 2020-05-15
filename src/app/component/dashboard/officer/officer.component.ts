import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { ToastrService } from 'ngx-toastr';
import { OfficerService } from '../../../service/officer.service';

@Component({
    selector: 'app-officer',
    templateUrl: './officer.component.html',
    styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit {

    show_delete_button: Boolean = false;
    loading: Boolean = false;
    is_creating_updating: Boolean = false;

    constructor(
        private dialog: MatDialog,
        private _officer: OfficerService,
        private _toast: ToastrService
    ) { }


    displayedColumns: string[] = ['name', 'phone', 'email', 'deptt', 'active'];
    display_val: Array<String> = ["Name", 'Phone', "Email", "Department", 'Officer Active'];
    dataSource = new MatTableDataSource([]);

    new = {
        name: '',
        email: '',
        phone: '',
        deptt: '',
        method: 'post'
    };

    ngOnInit() {
        this.loading = !this.loading;
        this._officer.getOfficers().subscribe(
            res => {
                this.dataSource = new MatTableDataSource(res.body);
                this.loading = !this.loading;
            },
            err => {
                this._toast.error(err.message, 'Error');
                this.loading = !this.loading;
            }
        );
    }

    openAddOfficer(data): void {
        this.dialog.open(AddOfficerComponent, {
            width: '60%',
            height: '80%',
            autoFocus: true,
            disableClose: false,
            data: data
        });
    }

    delete(id): void {
        const r = confirm('Are you sure? Officer will be deleted.');
        if (!r) return;
        this._officer.deleteOfficer(id).subscribe(
            res => this.handle_response(res, true),
            err => this.handle_response(err, false)
        );
    }

    handle_response(res, error: Boolean) {
        let msg = error ? "Error" : "Warning";
        if (res.success) this._toast.success(res.message, "Success");
        else this._toast.warning(res.message, msg);
    }
}
