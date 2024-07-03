import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit, ICellRendererAngularComp {

  constructor() {
      console.log("Yes I am ready ");
  }

  ngOnInit(): void {
  }

  params: any;
  label: any;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }


  execute() {
    console.log('params', this.params.node);
    // this.params.context.componentParent.DeleteData(selectedNode.data);

    let selectedNode = this.params.node;
    let selectedData = selectedNode.data;
    this.params.api.updateRowData({remove: [selectedData]});
    this.params.context.componentParent.DeleteData(selectedNode.data);
  }


  onClick($event : any) {
    if (this.params.onClick instanceof Function) {

      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);
      console.log('button event', $event);
    }
  }


  onModal() {
    let selectedNode = this.params.node;
    console.log('select', selectedNode.data);
    let selectedData = selectedNode.data;
    this.params.context.componentParent.modal(selectedData);
  }


}