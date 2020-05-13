import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dash-nav',
    templateUrl: './dash-nav.component.html',
    styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    public loading = false;
    constructor(private breakpointObserver: BreakpointObserver,
        private router: Router) { }

    navigation = [
        { url: '/admin/dashboard', title: "dashboard", style: "blue-text text-accent-2  fa fa-dashboard"},
        { url: '/admin/notify', title: "Notification", style: "light-green-text text-accent-4 fa fa-bell-o"},
        { url: '/admin/intern', title: "Interns", style: "purple-text fa fa-user-o" },
        { url: '/admin/report', title: "Report", style: "yellow-text text-accent-2 fa fa-file-picture-o", icon: "description" },
        { url: '/admin/application', title: "application", style: "teal-text fa fa-users"},
        { url: '/admin/suggestion', title: "suggestion", style: "pink-text fa fa-thumbs-o-up"},
        { url: '/admin/officer', title: "officer", style: "green-text text-accent-3 fa fa-university"},
        { url: '/admin/bank', title: "Account Details", style: "blue-text text-accent-3 fa fa-money"},
        { url: '/admin/tasks', title: "Intern Tasks", style: "yellow-text fa fa-flash" },
        { url: '/admin/interview', title: "Interview", style: "orange-text fa fa-laptop" },
        { url: '/admin/schedule', title: "Interview Schedule", style: "pink-text fa fa-calendar"},
        { url: '/admin/restricted', title: "Intern Credentials", style: "teal-text fa fa-lock" }
    ]

    logout(): void {
        window.localStorage.clear();
        window.localStorage.setItem('logout', 'ok');
        this.router.navigateByUrl('/');
    }
}
