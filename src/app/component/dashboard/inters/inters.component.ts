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

  input: Boolean = true;
  loading: Boolean = false;

  displayedColumns: string[] = ['name', 'branch', 'rollNo', 'phone', 'domain', 'update'];
  displayedColumns2: string[] = ['depNo', 'name', 'rollNo', 'officer', 'start', 'end', 'update'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  done_processing: Boolean = false;

  toggle(): void {
    this.input = !this.input;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource2.sort = this.sort;

    this.loading = true;
    this._internService.showRegisterIntern().subscribe(
      res => { this.dataSource2.data = res.interns; this.get_intern_with_officer(); },
      err => { this._toast.error(err.message, 'Something went wrong!'); this.loading = false; }
    );
  }

  get_intern_with_officer() {
    this._internService.showIntern()
      .subscribe(
        data => {
          this.dataSource.data = data.interns;
          this.loading = false;
        },
        err => {
          console.log(err);
          this._toast.error(err.message, 'Something went wrong!');
          this.loading = false;
        });
  }

  openInternDetails(data): void {
    const dialogRef = this.dialog.open(InternDetailsComponent, {
      width: '90%',
      height: '98%',
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
