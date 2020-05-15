import { Component, OnInit } from '@angular/core';
import { TasksService } from "../../../service/tasks.service";
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    constructor(private _tasksService: TasksService) { }
    all_tasks: Array<any> = [];

    ngOnInit() {
        this.get_all_tasks();
    }

    get_all_tasks() {
        this._tasksService.get_all_task().subscribe(
            res => this.all_tasks = res.body
        )
    }
}
