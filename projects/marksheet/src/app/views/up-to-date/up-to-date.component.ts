import { Component } from '@angular/core';
import { UpToDateBuildService } from './up-to-date.service';

@Component({
  selector: 'app-up-to-date',
  template: '<div *ngIf="buildIsUpToDate">Up-to-date</div><div *ngIf="!buildIsUpToDate">Out-of-date. Hit F5 to update</div>'  
})
export class UpToDateComponent  {

    public buildIsUpToDate = true;

    constructor(upToDateService: UpToDateBuildService) {
        upToDateService.buildIsUpToDate.subscribe(buildIsUpToDate => {
            this.buildIsUpToDate = buildIsUpToDate;
        });        
    } 
}