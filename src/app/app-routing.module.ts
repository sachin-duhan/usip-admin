import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { DashComponent } from './component/dashboard/dash/dash.component';
import { ApplicationComponent } from './component/dashboard/application/application.component';
import { IntersComponent } from './component/dashboard/inters/inters.component';
import { NotifyComponent } from './component/dashboard/notify/notify.component';
import { BankComponent } from "./component/dashboard/bank/bank.component";
import { ReportComponent } from './component/dashboard/report/report.component';
import { OfficerComponent } from './component/dashboard/officer/officer.component';
import { DashNavComponent } from './component/utility/dash-nav/dash-nav.component';
import { AccessComponent } from './component/dashboard/login/login.component';
import { SuggestionComponent } from './component/dashboard/suggestion/suggestion.component';
import { RoleGuardService as AdminGuard } from './role-guard.service';

import { InterviewComponent } from "./component/dashboard/interview/interview.component";
import { TasksComponent } from "./component/dashboard/tasks/tasks.component";
import { InterviewScheduleComponent } from "./component/dashboard/interview-schedule/interview-schedule.component";
import { PeriodControllerComponent } from "./component/dashboard/period-controller/period-controller.component";
const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'admin', component: DashNavComponent,
        children: [
            { canActivate: [AdminGuard], path: 'dashboard', component: DashComponent },
            { canActivate: [AdminGuard], path: 'notify', component: NotifyComponent },
            { canActivate: [AdminGuard], path: 'application', component: ApplicationComponent },
            { canActivate: [AdminGuard], path: 'bank', component: BankComponent },
            { canActivate: [AdminGuard], path: 'intern', component: IntersComponent },
            { canActivate: [AdminGuard], path: 'report', component: ReportComponent },
            { canActivate: [AdminGuard], path: 'interview', component: InterviewComponent },
            { canActivate: [AdminGuard], path: 'period', component: PeriodControllerComponent },
            { canActivate: [AdminGuard], path: 'tasks', component: TasksComponent },
            { canActivate: [AdminGuard], path: 'schedule', component: InterviewScheduleComponent },
            { canActivate: [AdminGuard], path: 'officer', component: OfficerComponent },
            { canActivate: [AdminGuard], path: 'restricted', component: AccessComponent },
            { canActivate: [AdminGuard], path: 'suggestion', component: SuggestionComponent }
        ]
    },
    // not found URL!
    { path: '**', redirectTo: '' },
];


@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }

