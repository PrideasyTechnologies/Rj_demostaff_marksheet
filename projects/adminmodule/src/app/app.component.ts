import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {CommanService} from "./globals/common.services";
import {ConsoleToggleService} from "../../../adminmodule/src/app/globals/logger.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers: [CommanService],
})
export class AppComponent implements OnInit {
  title = 'Eazy Institute';

  idleState = 'Not started.';
  timedOut = false;
  lastPing!: Date;

  constructor(
    private router: Router,
    private titleService: Title,private billdeskService: CommanService,
    private iconSetService: IconSetService,
    private cd: ChangeDetectorRef,
    private idle: Idle, private keepalive: Keepalive,
    private consoleToggleService: ConsoleToggleService,
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };

    this.consoleToggleService.disableConsoleInProduction()

    idle.setIdle(1800);

    console.log('new', this.idleState)

    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    console.log('change', this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES))

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log('idle state', this.idleState);
      cd.detectChanges();
      // this.reset();
    });

    idle.onTimeout.subscribe(() => {

      console.log('Idle timeout state')
      this.idleState = 'Timed out!';
      cd.detectChanges();
      // this.timedOut = true;
      // console.log(this.idleState);
      this.router.navigate(['/login']);
      sessionStorage.clear();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      console.log('IDle for sometime')
      // this.childModal = true;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(8);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.billdeskService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.setStates();
    // document.addEventListener('contextmenu', function(e) {
    //   e.preventDefault();
    // });
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started';
  }
}
