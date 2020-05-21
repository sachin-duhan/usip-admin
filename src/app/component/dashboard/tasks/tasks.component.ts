import { Component, OnInit } from '@angular/core';
import { TasksService } from "../../../service/tasks.service";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    constructor(private _tasksService: TasksService) { }
    /** data for the table! */
    all_tasks: Array<any> = [];
    displayedColumns: Array<String> = ['officer', 'name', 'title', 'date', "is_completed"];
    display_val: Array<String> = ["Officer", "Name", "Task Details", "Assigned On", "Completed"];

    loading: Boolean = false;

    ngOnInit() { this.get_all_tasks(); }

    get_all_tasks() {
        this.loading = true;
        this._tasksService.get_all_task().subscribe(
            res => {
                this.all_tasks = this.process_data_for_table(res.body);
                this.loading = false;
            }
        )
    }

    process_data_for_table(data): Array<any> {
        if (!Array.isArray(data)) return [];
        data.forEach(el => {
            el.name = el.pInfo.pInfo.name;
            el.officer = el.created_by.name;
            el.date = el.date.substring(0, 10);
            el.date = el.date.split('-').reverse().join('/');
            el.created_by = undefined;
            el.pInfo = undefined;
        });
        return data;
    }
}
