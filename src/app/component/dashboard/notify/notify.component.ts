import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { NotifyService } from '../../../service/notify.service';
import { ToastrService } from 'ngx-toastr';
import { MatBottomSheet, MatDialog } from '@angular/material';

import { NewApplicationComponent } from '../application/new-application/new-application.component';
import { BankDetailsComponent } from '../../dashboard/inters/bank-details/bank-details.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _notificationService: NotifyService,
    private _toast: ToastrService,
    private sheet: MatBottomSheet,
    private dialog: MatDialog) { }

  public applicationAllow: Boolean = true;
  public showSettings: Boolean = false;
  public publicNotification: any = [];
  public privateNotification: any = [];
  private loading: Boolean = false;

  ngOnInit() {
    this.loading != this.loading;

    // getting the private notification
    this._notificationService.internNotification().subscribe(res => {
      this.privateNotification = res.notifications;
      this.loading != this.loading;
    }, err => {
      console.log(err);
      this.loading != this.loading;
      this._toast.error(err.error.message, 'No intern notification!');
    });

    // getting the public notification
    this._notificationService.publicNotification().subscribe(
      res => {
        this.publicNotification = res.body;
        this.loading != this.loading;
      }, err => {
        console.log(err);
        this.loading != this.loading;
      }
    );
  }
  public ApplicationStatus(): void {
    this.applicationAllow = !this.applicationAllow;
  }
  public openSettings(): void {
    this.showSettings = !this.showSettings;
  }
  notificationForm = this.fb.group({
    title: [''],
    public: ['']
  });

  submitForm(): void {
    const data = {
      title: this.notificationForm.get('title').value,
      visiblity: this.notificationForm.get('public').value,
    };

    this._notificationService.postNotification(data).subscribe(body => {
      this._toast.success('Notification Added', 'Congratulations');
      this.notificationForm.reset();
      this.notificationForm.markAsUntouched();
    },
      err => {
        console.log(err);
        this._toast.error(err.message, 'BAD REQUEST');
      });
  }

  updateBank(): void {
    this.openSettings();
    this.dialog.open(BankDetailsComponent, {
      width: '40%',
      height: '80%'
    });
  }
  updateApplication(): void {
    this.openSettings();
    this.sheet.open(NewApplicationComponent);
  }
  deleteNotification(data): void {
    console.log(data);
    var alert = confirm("Do you want to delete the application!");
    if (alert) {
      this._notificationService.deleteNoti(data).subscribe(
        res => {
          console.log(res);
          this._toast.success('Notification deleted successfully', 'Done');
          document.getElementById(data).classList.add('hide');
        }, err => {
          console.log(err);
          this._toast.error(err.message, "BAD REQUEST");
        }
      );
    }
  }
}
