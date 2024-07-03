import {Component, OnInit} from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit{

  public navItems = navItems;

  constructor() {}

  Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);

  ngOnInit() {
    this.Clickeventblock();
}

  Clickeventblock(){



    if(this.Aadhaar !== 1001) {
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
      return;
    }

  }
}
