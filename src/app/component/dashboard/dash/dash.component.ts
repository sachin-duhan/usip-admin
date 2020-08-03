import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit {
    public loading: Boolean = false;
    public internReport: Array<any> = [];
    public bankDetails: Array<any> = [];
    public officers: Array<any> = [];
    public applications: Array<any> = [];
    public notification: Array<any> = [];

    constructor(private loginService: LoginService) { }

    public cards = [
        { title: 'Applications', cols: 2, rows: 1, url: '/admin/application' },
        { title: 'Interns Reports', cols: 1, rows: 1, url: '/admin/intern' },
        { title: 'Bank details', cols: 1, rows: 2, url: '/admin/intern' },
        { title: 'Officers', cols: 1, rows: 1, url: '/admin/officer' },
        { title: 'Notification', cols: 2, rows: 1, url: '/admin/notify' },
    ];

    public sCards = [
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
            url: '/admin/officer', icon: 'account_balance', color: 'red accent-2 right',
            title: 'Officers', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
        {
            url: '/admin/report', icon: 'bubble_chart', color: 'purple accent-2 right',
            title: 'Reports', count: 0, cols: '1', rows: '1',
            style: 'white dashboard-card center black-text pd-20 box-border pointer'
        },
    ];

    ngOnInit() {
        this.loading = true;
        this.loginService.get_dashboard_data().subscribe(data => {
            console.log(data);
            // mae sure that index of the card is same! as that of title of card!
            this.sCards[0].count = data.body.count.application;
            this.sCards[1].count = data.body.count.intern;
            this.sCards[2].count = data.body.count.officer;
            this.sCards[3].count = data.body.count.reports;
            this.applications = data.body.applications;
            this.internReport = data.body.reports;
            this.officers = data.body.officers;
            this.bankDetails = data.body.interns;
            this.notification = data.body.notifications;
            this.loading = false;
        });
    }
}

export interface Card {
    title: String;
    cols: Number;
    rows: Number;
    data: Object;
}
