import {Injectable} from '@angular/core';
import {
    HttpClient,
} from '@angular/common/http';
import {GlobalMessage} from '../../../globals/global.message';

@Injectable({
    providedIn: 'root',
})
export class UpdateprofileService {

    constructor(private http: HttpClient,
                private globalmessage: GlobalMessage) {
    }

}
