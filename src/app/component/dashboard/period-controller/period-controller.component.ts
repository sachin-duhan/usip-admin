import { Component, OnInit } from '@angular/core';
import { BankDetailsComponent } from '../inters/bank-details/bank-details.component';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { NewApplicationComponent } from '../application/new-application/new-application.component';

@Component({
    selector: 'app-period-controller',
    templateUrl: './period-controller.component.html',
    styleUrls: ['./period-controller.component.css']
})
export class PeriodControllerComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private sheet: MatBottomSheet,
    ) { }

    ngOnInit() { }

    showSettings: Boolean = true;
    updateBank(): void {
        this.showSettings = !this.showSettings;
        this.dialog.open(BankDetailsComponent, {
            width: "40%",
            disableClose: true
        });
    }

    updateApplication(): void {
        this.showSettings = !this.showSettings;
        this.sheet.open(NewApplicationComponent);
    }
}
