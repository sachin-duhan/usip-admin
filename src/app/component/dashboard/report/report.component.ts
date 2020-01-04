import { Component, OnInit, ViewChild } from '@angular/core';

import {InternModalComponent} from './intern-modal/intern-modal.component';

import {ReportService} from '../../../service/report.service';
import { MatPaginator, MatBottomSheet, MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _reportService: ReportService,
              private _sheet: MatBottomSheet) { }

  private loading = false;
  public internReport = [];

  private input: Boolean = true;

  displayedColumns: string[] = ['depno', 'period' ,'date', 'update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  toggle(): void {
    this.input = !this.input;
  }

  ngOnInit() {
    this.loading = !this.loading;
    this._reportService.getAllReport()
    .subscribe(
      data => {
        this.dataSource = data.reports;
        // console.log(this.dataSource);
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

  showReport(data): void {
    //console.log(data);
    this._sheet.open(InternModalComponent,{
      data: data
    });
  }
}
