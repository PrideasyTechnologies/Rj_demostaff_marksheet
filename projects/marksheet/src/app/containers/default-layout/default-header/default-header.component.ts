import {Component, Input, OnInit} from '@angular/core';

import { HeaderComponent } from '@coreui/angular-pro';
import {Router} from "@angular/router";
import {Sessiondata} from "../../../models/request";
import {SessionService} from "../../../globals/sessionstorage";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{


  oSession!: Sessiondata;

  Finyear: number = 0;

  constructor(private router: Router,
              private sessionService : SessionService) {

    super();


  }

  ngOnInit() {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();
    console.log('fff',this.oSession)

    this.Finyear = this.oSession.finyear!


  }


  @Input() sidebarId: string = 'sidebar1';
  logoutlogin(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
