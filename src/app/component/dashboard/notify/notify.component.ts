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

    creating_notification: Boolean = false;
    constructor(private fb: FormBuilder,
        private _notificationService: NotifyService,
        private _toast: ToastrService,
    ) { }

    public applicationAllow: Boolean = true;
    public showSettings: Boolean = false;
    public publicNotification: any = [];
    public privateNotification: any = [];
    private loading: Boolean = false;


    private fileData: File = null;
    public input_msg = "Choose a File for Notification";

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

    notificationForm = this.fb.group({
        title: [''],
        public: [''],
        description: ['']
    });

    submitForm(): void {
        const data = {
            title: this.notificationForm.get('title').value,
            visiblity: this.notificationForm.get('public').value,
            description: this.notificationForm.get('description').value,
        };
        // if (!this.fileData) {
        //     this._toast.warning("Kindly choose a file", "Warning");
        //     return;
        // }
        let form = new FormData();
        form.append('title', data.title);
        form.append('description', data.description);
        form.append('visiblity', data.description);
        form.append('image', this.fileData, this.fileData.name);

        this._notificationService.postNotification(form).subscribe(
            res => {
                this._toast.success(res.message, "success");
                this.notificationForm.reset();
                this.notificationForm.markAsUntouched();
            },
            err => this._toast.error(err.message, 'Error'));
    }

    onFileSelected(event) {
        this.fileData = <File>event.target.files[0];
        this.input_msg = this.fileData.name;
    }

    deleteNotification(data): void {
        console.log(data);
        var alert = confirm("Do you want to delete the application!");
        if (alert) {
            this._notificationService.deleteNoti(data).subscribe(
                res => {
                    console.log(res);
                    this._toast.success('Notification deleted successfully', 'Done');
                    document.getElementById(data).classList.add('hidden');
                }, err => {
                    console.log(err);
                    this._toast.error(err.message, "BAD REQUEST");
                }
            );
        }
    }
}
