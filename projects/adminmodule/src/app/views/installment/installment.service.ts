import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from "../../globals/sessionstorage";


export interface IUserData {
    College_code: number;
    Finyear: number;
    Batch_Code: number;
    Fees_code: number;
    Term_Code: number;
    Installment: string;
    Amount: number;
}

export interface ITableData extends Array<IUserData> {
}

@Injectable({
    providedIn: 'root'
})
export class InstallmentService {

    // data:any;

    constructor(private http: HttpClient, private sessionservice: SessionService) {
    }

    // Http Options

}
