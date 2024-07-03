import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-delete-cellcustom',
  templateUrl: './delete-cellcustom.component.html',
//   styleUrls: ['./delete-cellcustom.component.css']
})
export class DeleteCellCustomComponent implements OnInit, ICellRendererAngularComp {

  constructor() {

  }

  ngOnInit(): void {
  }

  params:any;
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
    console.log('jg event', selectedNode.data);
// this.params.api.updateRowData({remove: [selectedData]});
// this.params.context.componentParent.DeleteData(selectedNode.data);
    this.params.context.componentParent.DeleteSuccessDialog(selectedNode.data);
  }


  onClick($event: any) {
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


}
