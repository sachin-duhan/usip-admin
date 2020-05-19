import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { NotifyService } from '../../../service/notify.service';
import { ToastrService } from 'ngx-toastr';

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
    public publicNotification: Array<any> = [];
    public intern_notifications: Array<any> = [];
    private loading: Boolean = false;


    private fileData: File = null;
    public input_msg = "Choose a File for Notification";

    ngOnInit() {
        this.loading != this.loading;

        // getting the private notification
        this._notificationService.internNotification().subscribe(res => {
            this.intern_notifications = res.body ? res.body : [];
            this.loading != this.loading;
        }, err => {
            console.log(err);
            this.loading != this.loading;
        });

        // getting the public notification
        this._notificationService.publicNotification().subscribe(
            res => {
                this.publicNotification = res.body ? res.body : [];
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

    deleteNotification(id: String, index: number, type): void {
        // console.log(data);
        var flag = confirm("Do you want to delete the application!");
        if (!flag) return;
        this._notificationService.deleteNoti(id).subscribe(
            res => {
                this._toast.success(res.message, 'Success');
                if (type == 'intern') this.intern_notifications.splice(index, 1);
                else this.publicNotification.splice(index, 1);
            }, err => this._toast.error(err.message, "Error")
        );
    }
}
