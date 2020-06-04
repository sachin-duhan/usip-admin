import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../service/report.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    constructor(private _reportService: ReportService) { }
    public loading = false;
    public internReport: Array<any> = [];
    show_image: Boolean = false;

    ngOnInit() {
        this.loading = true;
        this._reportService.getAllReport().subscribe(
            res => {
                this.internReport = res.body;
                this.loading = false;
            }, err => this.loading = false);
    }
}
