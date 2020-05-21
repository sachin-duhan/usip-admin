import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { InternService } from '../../../service/intern.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

    constructor(private _internService: InternService, private _toast: ToastrService) { }

    bugs: Array<any> = [];
    ngOnInit() {
        this._internService.get_improvement().subscribe(res => this.bugs = res.body);
    }

    mark_resolved(data) {
        if (data.isResolved) { this._toast.warning('Already resolved'); return; }
        data.isResolved = true;
        this._internService.mark_improvement_resolved(data._id, data).subscribe(
            res => this._toast.success(res.message == 'ok' ? "Suggestion updated successfully" : res.message, 'Done'),
            err => this._toast.error(err.message, 'Error!')
        )
    }

    delete(id, index: number): void {
        this._internService.delete_improvement(id).subscribe(res => {
            this.bugs.splice(index, 1);
            this._toast.success(res.message, 'Done');
        }, err => this._toast.error(err.message, 'Not Done'))
    }
}
