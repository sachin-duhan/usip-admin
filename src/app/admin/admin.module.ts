import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// this is for the requests!!

import * as Material from '@angular/material';

// Service are meant to be addded to the providers
import { InternService } from '../service/intern.service';
import { RegisterService } from '../service/register.service';
import { OfficerService } from '../service/officer.service';
import { NotifyService } from '../service/notify.service';
import { ReportService } from '../service/report.service';
import { TasksService } from '../service/tasks.service';

// views and the layout imports!!
import { DashComponent } from '../component/dashboard/dash/dash.component';
import { DashNavComponent } from '../component/utility/dash-nav/dash-nav.component';
import { NotifyComponent } from '../component/dashboard/notify/notify.component';
import { IntersComponent } from '../component/dashboard/inters/inters.component';
import { ApplicationComponent } from '../component/dashboard/application/application.component';
import { ReportComponent } from '../component/dashboard/report/report.component';
import { OfficerComponent } from '../component/dashboard/officer/officer.component';
import { AddOfficerComponent } from '../component/dashboard/officer/add-officer/add-officer.component';
import { InternViewInternComponent } from '../component/dashboard/application/intern-view-intern/intern-view-intern.component';
import { InternDetailsComponent } from '../component/dashboard/inters/intern-details/intern-details.component';
import { NewApplicationComponent } from '../component/dashboard/application/new-application/new-application.component';
import { BankDetailsComponent } from '../component/dashboard/inters/bank-details/bank-details.component';
import { BankComponent } from '../component/dashboard/bank/bank.component';
import { AccessComponent } from '../component/dashboard/login/login.component'
import { SpinnerComponent } from "../component/utility/spinner/spinner.component";
import { SuggestionComponent } from '../component/dashboard/suggestion/suggestion.component';
import { BankDetailsFormComponent } from "../component/utility/bank-details-form/bank-details-form.component";
import { InterviewComponent } from '../component/dashboard/interview/interview.component';
import { TasksComponent } from '../component/dashboard/tasks/tasks.component';
import { PeriodControllerComponent } from '../component/dashboard/period-controller/period-controller.component';
import { InterviewScheduleComponent } from '../component/dashboard/interview-schedule/interview-schedule.component';
import { TableComponent } from '../component/utility/table/table.component';
import { MakingNewInternComponent } from '../component/utility/making-new-intern/making-new-intern.component';


@NgModule({
    declarations: [
        DashComponent,
        BankDetailsFormComponent,
        DashNavComponent,
        NotifyComponent,
        IntersComponent,
        ApplicationComponent,
        AccessComponent,
        ReportComponent,
        OfficerComponent,
        AddOfficerComponent,
        InternViewInternComponent,
        SpinnerComponent,
        InternDetailsComponent,
        NewApplicationComponent,
        BankDetailsComponent,
        BankComponent,
        SuggestionComponent,
        InterviewComponent,
        TasksComponent,
        PeriodControllerComponent,
        InterviewScheduleComponent,
        TableComponent,
        MakingNewInternComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AdminRoutingModule,
        Material.MatGridListModule,
        Material.MatMenuModule,
        Material.MatDatepickerModule,
        Material.MatNativeDateModule,
        Material.MatButtonModule,
        Material.MatSelectModule,
        Material.MatCardModule,
        Material.MatButtonModule,
        Material.MatFormFieldModule,
        Material.MatIconModule,
        Material.MatInputModule,
        Material.MatDialogModule,
        Material.MatBottomSheetModule,
        Material.MatTooltipModule,
        Material.MatSlideToggleModule,
        Material.MatRadioModule,
        Material.MatToolbarModule,
        Material.MatSidenavModule,
        Material.MatListModule,
        Material.MatTableModule,
        Material.MatPaginatorModule,
        Material.MatSortModule,
        Material.MatExpansionModule,
        Material.MatCheckboxModule,
        Material.MatChipsModule,
        Material.MatTabsModule,
        Material.MatStepperModule,
        Material.MatSliderModule
    ],
    providers: [
        InternService,
        RegisterService,
        OfficerService,
        TasksService,
        NotifyService,
        ReportService,
    ],
    entryComponents: [
        AddOfficerComponent,
        InternViewInternComponent,
        InternDetailsComponent,
        NewApplicationComponent,
        BankDetailsFormComponent,
        MakingNewInternComponent
    ]
})

export class AdminModule { }
