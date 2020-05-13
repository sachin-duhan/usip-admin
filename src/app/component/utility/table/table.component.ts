import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DownloadCSVService } from "../../../service/download-csv.service";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

    @Input() data: any;
    @Input() displayedColumns: Array<String>;
    @Input() display_val: Array<String>;
    @Input() title: String = "loading...";

    dataSource = new MatTableDataSource(this.data);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() { }

    ngOnInit() {
        this.dataSource.data = this.data;
        setTimeout(() => this.dataSource.sort = this.sort);
        setTimeout(() => this.dataSource.paginator = this.paginator);
    }

    download() {
        let cvsService = new DownloadCSVService();
        cvsService.exportToCsv(`${this.title}.csv`, this.data);
    }
}
