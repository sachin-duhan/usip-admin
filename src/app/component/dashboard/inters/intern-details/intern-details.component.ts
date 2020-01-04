import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OfficerService } from '../../../../service/officer.service';

import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.css']
})
export class InternDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _officer: OfficerService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<InternDetailsComponent>) { }
  public officers = [];
  private loading: Boolean = false;
  // public selectedValue: string;
  // public internForm = {};
  ngOnInit() {
    console.log(this.data);
    this.loading = !this.loading;
    this._officer.getOfficers().subscribe(
      res => {
        //console.log(res);
        this.officers = res.officers;
        this.loading = !this.loading;
        //console.log(this.officers);
      },
      err => {
        console.log(err);
        this.loading = !this.loading;

        this.toast.error('Officers not found!!', err.error);
      }
    );
  }
  addOfficer(details): void {
    //console.log(details);
    this.loading = !this.loading;

    if (details === undefined) {
      this.toast.error('Kindly choose an Officer', 'Not Allowed');
      //alert('Kindly select the officer!');
    } else {
      const intern_id = this.data._id;
      const intern_data = {
        officer_id: details.Officer,
        start: new Date(details.start),
        end: new Date(details.end),
        depNo: details.depNo
      };

      this._officer.pushIntern(intern_data, intern_id).subscribe(
        res => {
          console.log(res);
          if (res.message === "intern updated") {
            window.localStorage.setItem('update', 'ok');
            this.loading = !this.loading;
            this.dialogRef.close();
          } else {
            console.log(res);
            this.loading = !this.loading;
            this.toast.warning(res.message, 'Try again later');
          }
        },
        err => {
          console.log(err);
          this.loading = !this.loading;
          this.toast.error(err.error.message, 'BAD request');
        }
      );
    }
  }
}
