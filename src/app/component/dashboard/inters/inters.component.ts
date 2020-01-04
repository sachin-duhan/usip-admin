import { Component, OnInit, ViewChild } from '@angular/core';
import { InternService } from '../../../service/intern.service';

import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { InternDetailsComponent } from './intern-details/intern-details.component';

@Component({
  selector: 'app-inters',
  templateUrl: './inters.component.html',
  styleUrls: ['./inters.component.css']
})
export class IntersComponent implements OnInit {

  constructor(private _internService: InternService,
    private dialog: MatDialog,
    private _toast: ToastrService) { }

  private input: Boolean = true;
  private loading: Boolean = false;

  displayedColumns: string[] = ['name', 'branch', 'rollNo', 'phone', 'update'];
  displayedColumns2: string[] = ['depNo', 'name', 'rollNo', 'officer', 'end', 'update'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  toggle(): void {
    this.input = !this.input;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource2.sort = this.sort;

    this.loading = !this.loading;
    this._internService.showRegisterIntern().subscribe(
      res => {
        this.dataSource2 = res.interns;
      },
      err => {
        console.log(err);
        this._toast.error(err.message, 'Something went wrong!');
      }
    );
    this._internService.showIntern()
      .subscribe(
        data => {
          this.dataSource.data = data.interns;
          this.loading = !this.loading;
        },
        err => {
          console.log(err);
          this._toast.error(err.message, 'Something went wrong!');
          this.loading = !this.loading;
        });
  }
  openInternDetails(data): void {
    //console.log(data);
    const dialogRef = this.dialog.open(InternDetailsComponent, {
      width: '85%',
      height: '95%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (window.localStorage.getItem('update') === 'ok') {
        this._toast.success('Intern updated successfully!', 'Congratulations!');
        window.localStorage.removeItem('update');
      }
    });
  }

}
