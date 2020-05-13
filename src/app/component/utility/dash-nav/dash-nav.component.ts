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
        { url: '/admin/dashboard', title: "Dashboard", style: "blue-text text-accent-2  fa fa-dashboard" },
        { url: '/admin/intern', title: "Interns", style: "purple-text fa fa-user-o" },
        { url: '/admin/report', title: "Report", style: "yellow-text text-accent-2 fa fa-file-picture-o", icon: "description" },
        { url: '/admin/bank', title: "Account Details", style: "blue-text text-accent-3 fa fa-money" },
        { url: '/admin/application', title: "Application", style: "teal-text fa fa-users" },
        { url: '/admin/interview', title: "Interview", style: "orange-text fa fa-laptop" },
        { url: '/admin/schedule', title: "Interview Schedule", style: "pink-text fa fa-calendar" },
        { url: '/admin/tasks', title: "Intern Tasks", style: "yellow-text fa fa-flash" },
        { url: '/admin/period', title: "New Internship", style: "blue-text fa fa-clock-o" },
        { url: '/admin/restricted', title: "Intern Credentials", style: "teal-text fa fa-lock" },
        { url: '/admin/officer', title: "Officer", style: "green-text text-accent-3 fa fa-university" },
    ]

    logout(): void {
        window.localStorage.clear();
        window.localStorage.setItem('logout', 'ok');
        this.router.navigateByUrl('/');
    }
    moveToTop() {
        window.scrollTo(0,0);
    }
}
