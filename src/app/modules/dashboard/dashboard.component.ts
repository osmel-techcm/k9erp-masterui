import { Component, OnInit } from '@angular/core';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(public _globals: Globals) { }

    ngOnInit() {
        
    } 

}
