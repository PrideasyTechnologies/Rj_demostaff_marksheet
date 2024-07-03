import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {Title} from '@angular/platform-browser';
import {LogUpdateService} from "./globals/log-update.service";
import {CheckForUpdateService} from "./globals/check-for-update.service";
import {PromptUpdateService} from "./globals/prompt-update.service";
import {fromEvent, merge, of, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {GlobalMessage} from "./globals/global.message";
import {ConsoleToggleService} from "./globals/logger.service";

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Eazy Institute';
    networkStatus: boolean = false;
    networkStatus$: Subscription = Subscription.EMPTY;

    constructor(
        private router: Router, private globalmessage: GlobalMessage,
        private titleService: Title,
        private iconSetService: IconSetService,
        private logUpdateService: LogUpdateService,
        private checkForUpdateService: CheckForUpdateService,
        private promptUpdateService: PromptUpdateService,
        private consoleToggleService: ConsoleToggleService,
    ) {
        titleService.setTitle(this.title);
        // iconSet singleton
        iconSetService.icons = {...iconSubset};
        this.consoleToggleService.disableConsoleInProduction()
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
        });

        this.checkNetworkStatus();
    }


    ngOnDestroy(): void {
        this.networkStatus$.unsubscribe();
    }


    checkNetworkStatus() {
        this.networkStatus = navigator.onLine;
        this.networkStatus$ = merge(
            of(null),
            fromEvent(window, 'online'),
            fromEvent(window, 'offline')
        )
            .pipe(map(() => navigator.onLine))
            .subscribe(status => {
                console.log('Network status', status);
                this.networkStatus = status;
                if (this.networkStatus == false) {
                    this.globalmessage.Show_error('Please check you internet connection.')
                }
            });
    }

}
