import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { InternViewInternComponent } from '../application/intern-view-intern/intern-view-intern.component';

import { RegisterService } from '../.././../service/register.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

    private showDeleteButton: Boolean = false;
    constructor(
        private dialog: MatDialog,
        private _registerService: RegisterService,
        private _toast: ToastrService
    ) { }

    public fetchData: Array<any> = [];
    private loading: Boolean = false;

    displayedColumns: Array<string> = ['name', 'rollNo', 'phone', 'domain', 'interview', 'update'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource(this.fetchData);

    ngOnInit() {
        this.loading = !this.loading;
        this._registerService.showRegisterations().subscribe(
            res => {
                this.fetchData = res.body;
                console.log(this.fetchData);
                this.dataSource.data = this.fetchData;
                setTimeout(() => this.dataSource.paginator = this.paginator);
                this.loading = !this.loading;
            },
            err => {
                console.log(err);
                this.loading = !this.loading;
            }
        );
    }

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

    // openInternDetails(data): void {
    //     const dialogRef = this.dialog.open(InternDetailsComponent, {
    //         width: '90%',
    //         height: '98%',
    //         data: data
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (window.localStorage.getItem('update') === 'ok') {
    //             this._toast.success('Intern updated successfully!', 'Congratulations!');
    //             window.localStorage.removeItem('update');
    //         }
    //     });
    // }

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
