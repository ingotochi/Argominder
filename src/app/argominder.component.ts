import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorJwt } from './core/detectors/jwt.service';
import { ChangeDetectorConfigurations } from './core/detectors/configurations.service';
import { Auth } from './services/auth.service';
import { IConfigurationsList } from './interfaces/IConfigurationsList';
import { IEventsFilter } from './interfaces/IEventsFilter';
import { IStreamProperties } from './interfaces/IStreamProperties';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { authActions, Menu } from './enums/enums';
import { isNullOrEmptyString } from './utils/helper';

@Component({
  selector: 'argominder',
  templateUrl: './argominder.component.html',
  styleUrls: ['./argominder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArgoMinderComponent implements OnInit, OnDestroy, AfterViewInit {

  // selectedTab: number = 0;
  // userAuthenticated: boolean;

    private auth$: Subscription;

  // private configurationsList: IConfigurationsList = {
  //   camDiapason: [], eventsFilter: {} as IEventsFilter, previewStatus: false, streamingProperties: {} as IStreamProperties
  // };

  constructor(private changeRef: ChangeDetectorRef, private configurations: ChangeDetectorConfigurations,
    private jwt: ChangeDetectorJwt, public router: Router, public authConf: Auth) {

    // this.configurations.initializeDataChanges();
    // this.jwt.initializeDataChanges();
    // this.configurations.setAll(this.configurationsList);

    this.auth$ = this.jwt.getDataChanges().pipe(filter(tt => tt.action === authActions.token)).subscribe((result) => {

      (async () => {
        const userLoggedIn: boolean = !isNullOrEmptyString(result.payload.access_token);
        this.loadHomePageIfLoggedIn(userLoggedIn);
      })();

      this.changeRef.markForCheck();
    })
  }

  async ngOnInit() {
    const userLoggedIn: boolean = await this.auth.userIsLogged();
    this.loadHomePageIfLoggedIn(userLoggedIn);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.auth$.unsubscribe();
  }

  private loadHomePageIfLoggedIn(userAthenticated: boolean): void {

    if (userAthenticated) {
      this.router.navigate([Menu.Home]);
    }
    else {
      if (location.origin != Menu.Login) {
        this.router.navigate([Menu.Login]);
      }
    }
  }
}