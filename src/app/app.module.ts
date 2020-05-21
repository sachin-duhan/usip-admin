import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// this is for the requests!!
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// toast message:
import { ToastrModule } from 'ngx-toastr';

// lazy loading!
import { AdminModule } from "../app/admin/admin.module";
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from "./admin/auth.guard";
import { TokenInterceptorService } from "./service/token-interceptor.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/login/login.component";

import * as Material from '@angular/material';

import { LoginService } from './service/login.service';
import { RoleGuardService } from './admin/role-guard.service';
import { MatFormField } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        LayoutModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        Material.MatCardModule,
        Material.MatButtonModule,
        Material.MatFormFieldModule,
        Material.MatIconModule,
        Material.MatInputModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
        }),
        AdminModule,
    ],
    exports: [
        HttpClientModule,
        BrowserModule,
        LayoutModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
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
})
export class AppModule { }
