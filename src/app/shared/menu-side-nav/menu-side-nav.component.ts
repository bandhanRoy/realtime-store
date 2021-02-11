import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/common/events.service';
import { SideNavService } from 'src/app/common/sidenav.service';
import { ICON_CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-menu-side-nav',
  templateUrl: './menu-side-nav.component.html',
  styleUrls: ['./menu-side-nav.component.scss']
})
export class MenuSideNavComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav', { static: false }) public sideNav: MatSidenav;
  @Input() mobileQuery: any;
  iconConstant = ICON_CONSTANTS;
  constructor(
    private sideNavService: SideNavService,
    private eventService: EventsService,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSideNav(this.sideNav, 'sideNav');
  }

  open() {
    this.sideNavService.open('sideNav1');
  }

  close() {
    this.sideNavService.close('sideNav1');
    this.sideNavService.close('sideNav');
  }

  redirect(route: string) {
    this.router.navigateByUrl(`/${route}`);
  }

  toggle() {
    this.sideNavService.toggle('sideNav1');
  }

  emit(value: string) {
    this.eventService.createService.emit(value);
  }

}
