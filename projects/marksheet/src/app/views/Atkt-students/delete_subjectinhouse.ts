import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  templateUrl: 'delete_subjectatktoutside.html',
})

export class Delete_Selectedsubject
  implements OnInit, ICellRendererAngularComp {


  constructor() {
  }

  ngOnInit(): void {}

  params: any;
  label!: string;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  execute() {
    console.log('params', this.params.node);

    let selectedNode = this.params.node;
    let selectedData = selectedNode.data;
    console.log('jg event', selectedNode.data);

    this.params.context.componentParent.Delete_Selected_subject(
      selectedNode.data
    );
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
      console.log('button event', $event);
    }
  }
}

