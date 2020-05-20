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
    loading: Boolean = false;
    constructor(private _internService: InternService,
        private _dialog: MatDialog,
        private _toast: ToastrService) { }

    updating_bank_details: Boolean = false;
    displayedColumns: string[] = ['depNo', 'name', 'bankName', 'bankAc', 'ifsc', 'end', 'update'];
    bank_details = new MatTableDataSource([]);

    vals: Array<String> = ['depNo', 'name', 'bankName', 'bankAc', 'ifsc', 'start', 'end'];
    display_vals: Array<String> = ['Deployment No', 'Name', 'Bank Name', 'Account number', 'IFSC Code', 'Internship start', 'Internship end'];
    ngOnInit() { this.get_all_intern_bank_details() }

    get_all_intern_bank_details() {
        this.loading = true;
        this._internService.showRegisterIntern().subscribe(res => {
            console.log(res);
            res.body.forEach(el => {
                el.name = el.pInfo.name;
                el.rollNo = el.pInfo.rollNo;
                el.officer = el.repOfficer.name;
                el.oDeptt = el.repOfficer.deptt;
                el.start = el.start.substring(0, 10);
                el.start = el.start.split('-').reverse().join('/');
                el.end = el.end.substring(0, 10);
                el.end = el.end.split('-').reverse().join('/');
            });
            this.bank_details = new MatTableDataSource(res.body);
            this.loading = false;
        }, err => this._toast.error(err.message, "Error"));
    }

    updateBankDetails(data): void {
        let newData = {
            email: data.pInfo.email,
            phone: data.pInfo.phone,
            bankName: data.bankName,
            bankAc: data.bankAc,
            ifsc: data.ifsc,
            _id: data._id
        }

        this._dialog.open(BankDetailsFormComponent, {
            width: '80%',
            height: '80%',
            data: newData
        });
    }
}
