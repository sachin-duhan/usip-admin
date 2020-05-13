import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { ToastrService } from 'ngx-toastr';
import {OfficerService} from '../../../service/officer.service';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private _officer: OfficerService,
    private _toast: ToastrService) { }

  private input: Boolean = true;
  public fetchData = [];
  private loading: Boolean = false;

  displayedColumns: string[] = ['name', 'phone', 'email', 'deptt', 'update'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();

  new = {
    name: '',
    email: '',
    phone: '',
    deptt: '',
    method: 'post'
  };

  toggle(): void {
    this.input = !this.input;
  }
  ngOnInit() {
    this.loading = !this.loading;
    this._officer.getOfficers().subscribe(
      res => {
        this.dataSource = res.officers;
        this.loading = !this.loading;
      },
      err => {
        console.log(err);
        this._toast.error('error in loading data', 'API Bug');
        this.loading = !this.loading;
      }
    );
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openAddOfficer(data): void {
    const dialogRef = this.dialog.open(AddOfficerComponent, {
      width: '60%',
      height: '80%',
      autoFocus: true,
      disableClose: false,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (window.localStorage.getItem('created')) {
        if (window.localStorage.getItem('created') === 'ok') {
          this._toast.success('Officer Data added!', 'Success');
          window.localStorage.removeItem('created');
        } else if (window.localStorage.getItem('created') === 'bug') {
          this._toast.error('Bad request!! conact developer', 'Officer not added!');
          window.localStorage.removeItem('created');
        } else {
          this._toast.error('Bad request!!', 'Officer not added');
          window.localStorage.removeItem('created');
        }
      }
    });
  }

  delete(data): void {
   const r = confirm('Are you sure');
    if (r) {
      this.loading = !this.loading;
      this._officer.deleteOfficer(data).subscribe(
        res => {
          console.log(res);
          if (res.message === 'officer deleted!') {
            this._toast.success('Officer Deleted', 'OK!');
            this.loading = !this.loading;
          } else {
          this._toast.error('Officer cant be deleted', 'BAD request');
          this.loading = !this.loading;
          }
        },
        err => {
          console.log(err);
          this._toast.error('Officer cant be deleted', 'API error');
          this.loading = !this.loading;
        }
      );
    }
  }
}
