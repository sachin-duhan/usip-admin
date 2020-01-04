import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { InternService } from '../../../service/intern.service';
import { BankDetailsFormComponent } from '../../utility/bank-details-form/bank-details-form.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor(private _internService: InternService,
    private _dialog: MatDialog,
    private _toast: ToastrService) { }
  displayedColumns2: string[] = ['depNo', 'name', 'bank', 'rollNo', 'officer', 'end', 'update'];
  dataSource2 = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this._internService.showRegisterIntern().subscribe(res => {
      this.dataSource2 = res.interns;
    }, err => {
      console.log(err);
    });
  }
  updateBankDetails(data): void {
    let newData = {
      email: data.pInfo.email,
      phone: data.pInfo.phone,
      bankName: data.bankName,
      bankAc: data.bankAc,
      ifsc: data.ifsc
    }
    let ref = this._dialog.open(BankDetailsFormComponent, {
      width: '80%',
      height: '80%',
      data: newData
    });

    ref.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._internService.putIntern(data._id, result).subscribe(res => {
          this._toast.success(res.message, 'Success');
        }, err => {
          console.log(err);
          this._toast.error(err.error.message, 'Faliure');
        });
      } else {
        this._toast.warning('Details are not updated!');
      }
    });
  }
}
