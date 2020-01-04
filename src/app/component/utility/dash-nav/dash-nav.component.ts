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
    .pipe(
      map(result => result.matches)
    );

  public loading = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router) { }
  
    
  logout(): void {
    window.localStorage.clear();
    window.localStorage.setItem('logout', 'ok');
    this.router.navigateByUrl('/');
  }
}
