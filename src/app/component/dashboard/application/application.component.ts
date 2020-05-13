import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../.././../service/register.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

    show_table: Boolean = false;
    constructor(private _registerService: RegisterService) { }

    public fetchData: Array<any> = [];
    private loading: Boolean = false;
    displayedColumns: Array<String> = ['name', 'rollNo', 'marks', 'phone', 'domain', 'isQualified'];
    display_val: Array<String> = ["Name", "Roll No.", "CGPA", 'Phone', "Domain", "Qualified"];

    ngOnInit() {
        this.loading = !this.loading;
        this._registerService.showRegisterations().subscribe(
            res => {
                this.fetchData = res.body;
                this.loading = !this.loading;
            },
            err => {
                console.log(err);
                this.loading = !this.loading;
            }
        );
    }
}
