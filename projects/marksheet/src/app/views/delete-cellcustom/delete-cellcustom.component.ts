import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";

@Component({
    selector: 'app-delete-cellcustom',
    templateUrl: './delete-cellcustom.component.html',
    //   styleUrls: ['./delete-cellcustom.component.css']
})
export class DeleteCellCustomComponent implements
    OnInit, ICellRendererAngularComp {
    constructor() {

    }

    ngOnInit(): void {
    }

    params: any;
    label!: string;

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    execute() {
        // this.params.context.componentParent.DeleteData(selectedNode.data);

        let selectedNode = this.params.node;
        let selectedData = selectedNode.data;
        // this.params.api.updateRowData({remove: [selectedData]});
        // this.params.context.componentParent.DeleteData(selectedNode.data);
        this.params.context.componentParent.DeleteSuccessDialog(selectedNode.data);
    }

    onClick($event: any) {
        if (this.params.onClick instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data,
                // ...something
            };
            this.params.onClick(params);
        }
    }
}
