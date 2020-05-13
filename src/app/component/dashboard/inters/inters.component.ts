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
    private _toast: ToastrService) { }

  loading: Boolean = false;

  displayedColumns: string[] = ['name', 'branch', 'rollNo', 'phone', 'domain', 'update'];
  displayedColumns2: string[] = ['depNo', 'name', 'rollNo', 'officer', 'start', 'end', 'update'];

  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  ngOnInit() {
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

}
