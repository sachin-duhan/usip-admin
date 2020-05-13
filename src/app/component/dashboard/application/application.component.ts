import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef } from '@angular/material';
import { InternViewInternComponent } from './intern-view-intern/intern-view-intern.component';

import { RegisterService } from '../.././../service/register.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

    private showDeleteButton: Boolean = false;
    constructor(
        private dialog: MatDialog,
        private _registerService: RegisterService,
        private _toast: ToastrService
    ) { }

    private input: Boolean = true;
    public fetchData: Array<any> = [];
    private loading: Boolean = false;

    displayedColumns: string[] = ['name', 'rollNo', 'phone', 'domain', 'interview', 'update'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource();

    toggle(): void {
        this.input = !this.input;
    }

    ngOnInit() {
        this.loading = !this.loading;
        this._registerService.showRegisterations().subscribe(
            res => {
                this.dataSource = res.body;
                this.loading = !this.loading;
            },
            err => {
                console.log(err);
                this.loading = !this.loading;
            }
        );
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // opening the intern result form!!
    public Openform(data): void {
        const dialogRef = this.dialog.open(InternViewInternComponent, {
            width: "98%",
            height: "98%",
            autoFocus: true,
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (window.localStorage.getItem('interview')) {
                if (window.localStorage.getItem('interview') === 'ok') {
                    this._toast.success('Interview result uploaded', 'Success!');
                } else {
                    this._toast.error('Interview result cant be uploaded', 'BAD request!');
                }
            }
            window.localStorage.removeItem('interview');
        });
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

    toggleButton() {
        this.showDeleteButton = !this.showDeleteButton;
    }
}
