import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, NavigationEnd } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ConfigService } from '../../services/config.service';
import { Globals } from '../../config/globals';
import { AuthService } from '../../services/auth.service';
import { HostListener } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { userConnected } from 'src/app/models/userConnected';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  private idle = 10;
  private idleTimeOut = 10;
  private idleCounter = 0;
  idleTimeOutCounter = 0;
  private idleModalIsOpen = false;
  private _userConnected = new userConnected()

  constructor ( private _router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private config: ConfigService, private globals: Globals, private _authService: AuthService ) {

    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    this.mobileQuery.addEventListener('change', (e) => {
      console.log(e)
    })

    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        //this.updateHubServerUrl(val.urlAfterRedirects);
      }
    });

    this.connection.on("ReceiveMessage", (user, message) => {
      console.log(user, message)
    });

  }

  ngOnInit() {
    //this.getConfig();
    this.config.getDateTimeServer().subscribe(
      data => { this.globals.dateServer = new Date(data) },
      err => { }
    )
    this.config.startTokenTimer()
    //this.startHub()
  }

  connection = new HubConnectionBuilder()
      .withUrl(this.globals.apiUrlWebSocket + "mainhub", {
        accessTokenFactory: () => {
          return localStorage.getItem(this.globals.keyStoreLogin)
        }
      })
      .configureLogging(LogLevel.Debug)
      .build();

  startHub(){
      try {
        this.connection.start().then(() => {
          let authMasterData = JSON.parse(localStorage.getItem(this.globals.keyStoreAuth))
          this._userConnected.Name = authMasterData.Name
          this._userConnected.LastName = authMasterData.LastName
          this._userConnected.userId = authMasterData.Id
          this._userConnected.appId = localStorage.getItem("appId")
          this._userConnected.deviceDesc = 'Web-App'
          this._userConnected.deviceType = 1
          this._userConnected.companyId = 'MasterDealer'
          this.connectUser();
        });

      } catch (err) {
          console.log('error:', err);
      }
  }

  connectUser(){
    this.connection.invoke("connectUser", this._userConnected).catch(err => console.log(err));
  }

  logoutUser() {
    localStorage.removeItem(this.globals.keyStoreLogin);
    localStorage.removeItem(this.globals.keyStoreAuth);
    this._router.navigate(["/login"]);
  }

  fillerNav = [
    { id: "0", link: "/mainview/dashboard", name: "Home" },
    { id: "1", link: "/mainview/customers", name: "Customers" },
    { id: "2", link: "/mainview/users", name: "Users" }
  ];

  getConfig() {
    this.config.getConfigData().subscribe(data => { });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown() {
    this.resetIdleCounter()
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.resetIdleCounter()
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    this.resetIdleCounter()
  }

  @ViewChild('idleSwal') private idleSwal: SwalComponent;

  startWatchIdle() {
    setTimeout(() => {
      if (this.idleCounter >= this.idle) {
        this.startIdleTimeOut()
        return
      } else {
        this.idleCounter++
        console.log('Counter ++', this.idleCounter, this.idle)
      }
      this.startWatchIdle()
    }, 1000);
  }

  startIdleTimeOut() {
    console.log('Show dialog', this.idleCounter, this.idle)
    if (this.idleTimeOutCounter >= this.idleTimeOut) {
      console.log('logout', this.idleTimeOutCounter, this.idleTimeOut)
    }

    if (!this.idleModalIsOpen) {
      this.idleModalIsOpen = true
      this.idleSwal.fire()
    }

    this.idleTimeOutCounter++
  }

  resetIdleCounter() {
    this.idleCounter = 0
  }

}
