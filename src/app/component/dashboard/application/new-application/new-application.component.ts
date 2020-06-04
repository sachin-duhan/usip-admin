import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-application',
    templateUrl: './new-application.component.html',
    styleUrls: ['./new-application.component.css']
})

export class NewApplicationComponent implements OnInit {

    constructor(private _resgisterService: RegisterService,
        private _toast: ToastrService, ) { }

    public isOpen: boolean = false;
    public loading: boolean = false;
    public show_domain_form: boolean = false;

    public application;
    public domains: Array<any> = [];

    public inputDomain: string = "";
    public applications_description: string = "USIP is accepting applications for a period of 3 months, under standard norms";

    public minDate = new Date();

    ngOnInit() {
        this.get_application_status();
        this._resgisterService.getDomain().subscribe(
            res => this.domains = res.body);
    }

    get_application_status() {
        this.loading = !this.loading;
        this._resgisterService.get_all_bank_or_applications('application').subscribe(
            res => {
                console.log(res);
                this.application = res.body[0];
                this.isOpen = this.application.isOpen;
                this.loading = !this.loading;
            });
    }

    closeApplication(id): void {
        this._resgisterService.CloseApplication({ id: id }, 'application').subscribe(
            res => this._toast.success(res.message, 'Done'),
            err => this._toast.error(err.message, "Error")
        );
    }

    openApplication(date): void {
        this.applications_description.trim();
        let Error: Array<{ description: string, heading: string }> = [];
        if (!date) Error.push({ description: "You cant open application wihtout an end Date", heading: "Date required" })
        if (!this.applications_description) Error.push({ description: "Applications description is required", heading: "Oops!" })
        if (Error.length > 0) {
            Error.forEach(el => this._toast.warning(el.description, el.heading));
            return;
        }
        this._resgisterService.OpenApplication({ end: date, details: this.applications_description }, 'application').subscribe(res => {
            this._toast.success(res.message, 'Successful');
        }, err => this._toast.error('cant open application', 'BAD request'));
    }

    addDomain(data): void {
        this._resgisterService.createDomain({ title: data }).subscribe(
            res => { this._toast.success(res.message, 'Done'), this.domains.push(res.body); },
            err => this._toast.error(err.message, 'Error'));
    }

    deleteDomain(id, index: number): void {
        this._resgisterService.deleteDomain(id).subscribe(res => {
            this._toast.success(res.message, 'OK!');
            this.domains.splice(index, 1);
        }, err => this._toast.error(err.message, 'BAD request'));
    }

}