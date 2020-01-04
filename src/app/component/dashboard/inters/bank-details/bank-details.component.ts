import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../service/register.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  constructor(private _register: RegisterService,
    private _toast: ToastrService,
    private dialogRef: MatDialogRef<BankDetailsComponent>) { }

  public loading: Boolean = false;
  public bankDetails: BankDetails;
  public open: Boolean = false;
  ngOnInit() {
    this.loading = !this.loading;
    this._register.applicationStatus('bank').subscribe(res => {
      this.bankDetails = res.status[res.status.length - 1];
      this.open = this.bankDetails.isOpen;
      this.loading = !this.loading;
    }, err => {
      console.log(err);
      this.loading = !this.loading;
      this._toast.error(err.message, 'BAD request');
    });
  }

  closeBank(id): void {
    const data = {
      id: id
    }
    this._register.CloseApplication(data, 'bank').subscribe(res => {
      console.log(res);
      this._toast.success(res.message, 'Done');
      this.dialogRef.close();
    }, err => {
      console.log(err);
      this.loading = !this.loading;
      this._toast.error(err.message, 'BAD request');
    });
  }
  openApplication(data): void {

    if (data) {
      const newData = {
        end: data
      };
      this._register.OpenApplication(newData, 'bank').subscribe(res => {
        console.log(res);
        this._toast.success(res.message, 'Congratulations');
        this.dialogRef.close();
      }, err => {
        console.log(err);
        this.loading = !this.loading;
        this._toast.error(err.message, 'BAD request');
      });
    } else {
      this._toast.warning('Can\'t open application without',)
    }
  }
}

export class BankDetails {
  isOpen: Boolean;
  _id: String;
  start: Date;
  end: Date;
}