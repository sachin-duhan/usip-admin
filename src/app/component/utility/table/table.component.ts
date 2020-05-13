import { Component, OnInit, Input } from '@angular/core';

import { DownloadCSVService } from "../../../service/download-csv.service";
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
    constructor() {}
    ngOnInit() {}

    download(){
        let cvsService = new DownloadCSVService();
        cvsService.exportToCsv(`${this.title}.csv`,this.data);
    }
}
