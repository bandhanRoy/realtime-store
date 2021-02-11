import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SideNavService {

  private sideNav = {
    sideNav: MatSidenav,
    sideNav2: MatSidenav
  }


  public setSideNav(sideNav: MatSidenav, name: string) {
    this.sideNav[name] = sideNav;
  }

  public open(name: string) {
    return this.sideNav[name].open();
  }


  public close(name: string) {
    return this.sideNav[name].close();
  }

  public toggle(name: string): void {
    this.sideNav[name].toggle();
  }
}
