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
    is_image_input_required: Boolean = false;
    constructor(private fb: FormBuilder,
        private _notificationService: NotifyService,
        private _toast: ToastrService,
    ) { }

    public applicationAllow: Boolean = true;
    public showSettings: Boolean = false;
    public publicNotification: Array<any> = [];
    public intern_notifications: Array<any> = [];
    public loading: Boolean = false;
    public fileData: File = null;
    input_msg: string = "Choose a File for Notification";

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
        console.log(data);
        var form = new FormData();
        if (this.is_image_input_required && this.fileData)
            form.append('image', this.fileData, this.fileData.name);
        form.append('title', data.title);
        form.append('description', data.description);
        form.append('visiblity', data.visiblity);
        form.append('is_imgae', this.is_image_input_required ? 'true' : 'false');
        this._notificationService.postNotification(form).subscribe(
            res => this.handle_notification_response(res, false, undefined, -1),
            err => { this._toast.error(err.message, 'Error'); console.log(err) });
    }

    onFileSelected($event) {
        this.fileData = <File>$event.target.files[0];
        this.input_msg = this.fileData.name;
    }

    deleteNotification(id: String, index: number, type): void {
        var flag = confirm("Do you want to delete the application!");
        if (!flag) return;
        this._notificationService.deleteNoti(id).subscribe(
            res => this.handle_notification_response(res, true, type, index),
            err => this._toast.error(err.message, "Error")
        );
    }

    handle_notification_response(res, update, update_val, index) {
        this._toast.success(res.message, "success");
        this.notificationForm.markAsUntouched();
        this.notificationForm.reset();
        if (update) {
            if (update_val == 'intern') this.intern_notifications.splice(index, 1);
            else this.publicNotification.splice(index, 1);
        }
    }
}
