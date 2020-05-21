import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }

