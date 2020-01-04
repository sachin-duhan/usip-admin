import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as Material from '@angular/material';

// this is for the requests!!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

// toast message:
import { ToastrModule } from 'ngx-toastr';

// Service are meant to be addded to the providers
import { InternService } from './service/intern.service';
import { RegisterService } from './service/register.service';
import { OfficerService } from './service/officer.service';
import { NotifyService } from './service/notify.service';
import { LoginService } from './service/login.service';
import { ReportService } from './service/report.service';
import { TokenInterceptorService } from './service/token-interceptor.service';

// views and the layout imports!!
import { AppComponent } from './app.component';
import { DashComponent } from './component/dashboard/dash/dash.component';
import { DashNavComponent } from './component/utility/dash-nav/dash-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { NotifyComponent } from './component/dashboard/notify/notify.component';
import { IntersComponent } from './component/dashboard/inters/inters.component';
import { ApplicationComponent } from './component/dashboard/application/application.component';
import { ReportComponent } from './component/dashboard/report/report.component';
import { OfficerComponent } from './component/dashboard/officer/officer.component';
import { AddOfficerComponent } from './component/dashboard/officer/add-officer/add-officer.component';
import { InternViewInternComponent } from './component/dashboard/application/intern-view-intern/intern-view-intern.component';
import { SpinnerComponent } from './component/utility/spinner/spinner.component';
import { InternModalComponent } from './component/dashboard/report/intern-modal/intern-modal.component';
import { InternDetailsComponent } from './component/dashboard/inters/intern-details/intern-details.component';
import { NewApplicationComponent } from './component/dashboard/application/new-application/new-application.component';
import { BankDetailsComponent } from './component/dashboard/inters/bank-details/bank-details.component';
import { BankComponent } from './component/dashboard/bank/bank.component';
import { AccessComponent } from './component/dashboard/login/login.component'
import { AuthGuard } from './auth.guard';
import { SuggestionComponent } from './component/dashboard/suggestion/suggestion.component';
import { TasksService } from './service/tasks.service';
import { RoleGuardService } from './role-guard.service';
import { BankDetailsFormComponent } from "./component/utility/bank-details-form/bank-details-form.component";
@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    BankDetailsFormComponent,
    DashNavComponent,
    LoginComponent,
    NotifyComponent,
    IntersComponent,
    ApplicationComponent,
    AccessComponent,
    ReportComponent,
    OfficerComponent,
    AddOfficerComponent,
    InternViewInternComponent,
    SpinnerComponent,
    InternModalComponent,
    InternDetailsComponent,
    NewApplicationComponent,
    BankDetailsComponent,
    BankComponent,
    SuggestionComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FileUploadModule,
    LayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),

    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatMenuModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSnackBarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatSelectModule,
    Material.MatDialogModule,
    Material.MatTooltipModule,
    Material.MatSlideToggleModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatExpansionModule,
    Material.MatBottomSheetModule,
    Material.MatCheckboxModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatStepperModule,
  ],
  exports: [HttpClientModule,
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatMenuModule,
    Material.MatSnackBarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatTooltipModule,
    Material.MatSlideToggleModule,
    Material.MatNativeDateModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatInputModule,
    Material.MatListModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatExpansionModule,
    Material.MatBottomSheetModule,
    Material.MatCheckboxModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatStepperModule
  ],
  providers: [
    InternService,
    RegisterService,
    OfficerService,
    TasksService,
    NotifyService,
    ReportService,
    LoginService,
    RoleGuardService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddOfficerComponent,
    InternViewInternComponent,
    InternModalComponent,
    InternDetailsComponent,
    NewApplicationComponent,
    BankDetailsComponent,
  ]
})
export class AppModule { }
