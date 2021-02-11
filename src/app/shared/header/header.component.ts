import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SideNavService } from 'src/app/common/sidenav.service';
import { ICON_CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  iconConstant = ICON_CONSTANTS;
  constructor(private sideNavService: SideNavService) { }
  ngOnInit() {
  }

  toggle() {
    this.sideNavService.toggle('sideNav');
  }

}
