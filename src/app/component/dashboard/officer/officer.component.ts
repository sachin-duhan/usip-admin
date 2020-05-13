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

    constructor(
        private dialog: MatDialog,
        private _officer: OfficerService,
        private _toast: ToastrService
    ) { }

    public fetchData: Array<any> = [];
    private loading: Boolean = false;

    displayedColumns: string[] = ['name', 'phone', 'email', 'deptt', 'update'];

    dataSource = new MatTableDataSource(this.fetchData);
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
                this.fetchData = res.officers;
                this.dataSource = new MatTableDataSource(this.fetchData);
                this.loading = !this.loading;
            },
            err => {
                console.log(err);
                this._toast.error('error in loading data', 'API Bug');
                this.loading = !this.loading;
            }
        );
    }

    openAddOfficer(data): void {
        const dialogRef = this.dialog.open(AddOfficerComponent, {
            width: '60%',
            height: '80%',
            autoFocus: true,
            disableClose: false,
            data: data
        });
    }

    delete(data): void {
        const r = confirm('Are you sure');
        if (r) {
            this.loading = !this.loading;
            this._officer.deleteOfficer(data).subscribe(
                res => {
                    console.log(res);
                    if (res.message === 'officer deleted!') {
                        this._toast.success('Officer Deleted', 'OK!');
                        this.loading = !this.loading;
                    } else {
                        this._toast.error('Officer cant be deleted', 'BAD request');
                        this.loading = !this.loading;
                    }
                },
                err => {
                    console.log(err);
                    this._toast.error('Officer cant be deleted', 'API error');
                    this.loading = !this.loading;
                }
            );
        }
    }
}
