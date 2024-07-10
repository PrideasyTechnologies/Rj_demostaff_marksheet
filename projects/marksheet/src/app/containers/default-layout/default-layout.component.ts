import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { CommonService } from '../../globals/common.service';
import { get_menus_coreui } from '../../globals/global-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public versionNumber!: string;
  public navItems = navItems;

  menus_resp:any
  constructor(private commonService: CommonService) { }

  Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
  Token = sessionStorage.getItem('Token');

  ngOnInit(): void {
    // this.Get_menus_api();
    this.fetchVersionNumber();

    this.fetchnavitems();
    this.Clickeventblock();
  }
  private fetchVersionNumber() {
    // this.buildDetailsService.fetchBuildDetails().subscribe((buildDetails: BuildDetails) => {
    //   this.versionNumber = buildDetails.buildNumber;
    // });
  }

  fetchnavitems(){

  }

  Clickeventblock(){

    console.log('Token',this.Token)

    if(this.Aadhaar !== 1002) {
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
      return;
    }
  }

  Get_menus_api(){
    this.commonService.Post_json(get_menus_coreui,"").subscribe((response) => {
      if (response == null) {
       
      }
      const hasKey = 'data' in response;
      if (hasKey) {
        
        this.menus_resp = response.data;
      } else {
        this.menus_resp = response;
      }

      // this.navItems = this.menus_resp
      console.log('naaaaa',this.navItems)
      // let javascriptobj = JSON.parse(this.menus_resp)
      
      // console.log('getmenuu::',this.menus_resp)
    });
  }
}
