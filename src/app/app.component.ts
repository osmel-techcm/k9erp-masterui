import { Component, OnInit } from '@angular/core';
import { Title, EventManager } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Globals } from './config/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'Master Dealer';

    hideLoading: boolean = true;
    appId: string

    public constructor(private titleService: Title, private _router: Router, private _global: Globals, public _event: EventManager) {
        this.setTitle(this.title);
        this.listenerLocalStorage();   
    }

    ngOnInit(): void {
        this.appId = localStorage.getItem("appId");
        if (!this.appId) {
            this.appId = this.guid()
            localStorage.setItem('appId', this.appId)
        }
    }  

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    saving = {
        color: "primary",
        mode: "indeterminate",
        diameter: 50
    };

    public listenerLocalStorage(): void {
        window.addEventListener('storage', data => {
            if (data.key == this._global.keyStoreLogin && data.newValue) {
                this._router.navigate(["/mainview"]);
            }

            if (data.key == this._global.keyStoreLogin && !data.newValue) {
                this._router.navigate(["/login"]);
            }
        }, false);
    }

    guid ():string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    s4 ():string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}
