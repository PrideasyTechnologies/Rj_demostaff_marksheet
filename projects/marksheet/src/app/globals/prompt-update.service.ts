import {Injectable} from "@angular/core";
import {SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {filter} from "rxjs";
import Swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class PromptUpdateService {

    constructor(swUpdate: SwUpdate) {
        swUpdate.versionUpdates
            .pipe(filter((evt): evt is VersionReadyEvent =>
              evt.type === 'VERSION_READY'))
            .subscribe(evt => {
                this.promptUser(evt)
            });
    }

    private promptUser(evt: VersionReadyEvent): void {
        Swal.fire({
            title: 'Update Available!',
            text: 'A new version is available. Do you want to update?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location.reload();
            }
        });
    }

}
