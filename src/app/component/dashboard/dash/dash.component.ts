import { Component, OnInit } from '@angular/core';

import { InternService } from '../../../service/intern.service';
import { RegisterService } from '../../../service/register.service';
import { NotifyService } from '../../../service/notify.service';
import { OfficerService } from '../../../service/officer.service';
import { ReportService } from '../../../service/report.service';

import { http_handler } from "../../../helper/HTTP_handler";

export interface Card {
    title: String;
    cols: Number;
    rows: Number;
    data: Object;
}

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {
    private loading: Boolean = false;
    private handler = new http_handler(null).handle_response;
    // data for reports!!
    public internReport = [];
    public bankDetails = [];
    public officer = [];
    public applications = [];
    public notification = [];

    constructor(
        private _internService: InternService,
        private _registerService: RegisterService,
        private _reportService: ReportService,
        private _officerservice: OfficerService,
        private _notifyService: NotifyService
    ) { }

    /** Based on the screen size, switch from standard to one column per row */
    public cards: any = [
        { title: 'Applications', cols: 2, rows: 1, url: '/admin/application' },
        { title: 'Interns Reports', cols: 1, rows: 1, url: '/admin/intern' },
        { title: 'Bank details', cols: 1, rows: 2, url: '/admin/intern' },
        { title: 'Officers', cols: 1, rows: 1, url: '/admin/officer' },
        { title: 'Notification', cols: 2, rows: 1, url: '/admin/notify' },
    ];

    /** Based on the screen size, switch from standard to one column per row */
    public sCards: any = [
        {
            url: '/admin/application', icon: 'people', color: 'yellow accent-2 right',
            title: 'Applicants', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
        {
            url: '/admin/intern', icon: 'school', color: 'blue accent-2 right',
            title: 'Interns ', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
        {
            url: '/admin/report', icon: 'bubble_chart', color: 'purple accent-2 right',
            title: 'Reports', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
        {
            url: '/admin/officer', icon: 'account_balance', color: 'red accent-2 right',
            title: 'Officers', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
    ];

    ngOnInit() {

        this.loading = !this.loading;
        // interns only!!
        this._officerservice.getOfficers().subscribe(
            res => {
                this.officer = res.officers;
                this.sCards[3].count = this.officer.length;
            }, err => {
                console.log(err);
            });
        this._internService.showIntern().subscribe(res => {
            this.sCards[1].count = res.interns.length;
        }, err => {
            console.log(err);
        });
        this._internService.showRegisterIntern().subscribe(res => {
            this.bankDetails = res.interns;
        }, err => {
            console.log(err);
        });
        this._notifyService.publicNotification().subscribe(res => {
            this.notification = res.notifications;
        }, err => {
            console.log(err);
        });
        this._reportService.getAllReport().subscribe(res => {
            this.internReport = res.reports;
            this.sCards[2].count = this.internReport.length;
        }, err => {
            console.log(err);
        });

        this._registerService.showRegisterations().subscribe(
            res => {
                this.applications = res.application;
                this.sCards[0].count = this.applications.length;
                this.loading = !this.loading;
            }, err => {
                console.log(err);
                this.loading = !this.loading;
            });
    }

}
