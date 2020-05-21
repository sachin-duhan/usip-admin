import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from '../component/dashboard/dash/dash.component';
import { ApplicationComponent } from '../component/dashboard/application/application.component';
import { IntersComponent } from '../component/dashboard/inters/inters.component';
import { NotifyComponent } from '../component/dashboard/notify/notify.component';
import { BankComponent } from "../component/dashboard/bank/bank.component";
import { ReportComponent } from '../component/dashboard/report/report.component';
import { OfficerComponent } from '../component/dashboard/officer/officer.component';
import { DashNavComponent } from '../component/utility/dash-nav/dash-nav.component';
import { AccessComponent } from '../component/dashboard/login/login.component';
import { SuggestionComponent } from '../component/dashboard/suggestion/suggestion.component';
import { RoleGuardService as AdminGuard } from './role-guard.service';

import { InterviewComponent } from "../component/dashboard/interview/interview.component";
import { TasksComponent } from "../component/dashboard/tasks/tasks.component";
import { InterviewScheduleComponent } from "../component/dashboard/interview-schedule/interview-schedule.component";
import { PeriodControllerComponent } from "../component/dashboard/period-controller/period-controller.component";

const routes: Routes = [
    {
        path: '', component: DashNavComponent,
        children: [
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'dashboard', component: DashComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'notify', component: NotifyComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'application', component: ApplicationComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'bank', component: BankComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'intern', component: IntersComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'report', component: ReportComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'interview', component: InterviewComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'period', component: PeriodControllerComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'tasks', component: TasksComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'schedule', component: InterviewScheduleComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'officer', component: OfficerComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'restricted', component: AccessComponent },
            { canActivate: [AdminGuard], pathMatch: 'full', path: 'suggestion', component: SuggestionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
