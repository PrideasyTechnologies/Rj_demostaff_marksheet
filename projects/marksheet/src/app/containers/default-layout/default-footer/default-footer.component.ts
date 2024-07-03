import {Component, OnInit} from '@angular/core';
import { FooterComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent implements OnInit{

  public versionNumber!: string;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.fetchVersionNumber();
  }

  private fetchVersionNumber() {
    // this.buildDetailsService.fetchBuildDetails().subscribe((buildDetails: BuildDetails) => {
    //   this.versionNumber = buildDetails.buildNumber;
    // });
  }
}
