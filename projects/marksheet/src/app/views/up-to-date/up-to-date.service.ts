import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BuildDetailsService } from '../../globals/build-details.service';
import { BuildDetails } from '../../globals/build-details.model';

@Injectable({ providedIn: 'root' })
export class UpToDateBuildService {
  private buildIsUpToDateSubject = new BehaviorSubject<boolean>(true);
  private buildNumberAtStartup: string;

  constructor(
    buildDetailsService: BuildDetailsService,
    private httpClient: HttpClient
  ) {
    this.buildNumberAtStartup = buildDetailsService.buildDetails.buildNumber;
    this.pollForBuildNumber();
  }

  public get buildIsUpToDate(): Observable<boolean> {
    return this.buildIsUpToDateSubject;
  }

  private pollForBuildNumber() {
    const pollInterval = 60000;

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
      }),
    };

    timer(pollInterval, pollInterval).subscribe(() => {
      this.httpClient
        .get<BuildDetails>('assets/build-details.json', httpOptions)
        .subscribe((response) => {
          const newBuildNumber = response.buildNumber;
          if (this.buildNumberAtStartup !== newBuildNumber) {
            this.buildIsUpToDateSubject.next(false);
          }
        });
    });
  }
}
