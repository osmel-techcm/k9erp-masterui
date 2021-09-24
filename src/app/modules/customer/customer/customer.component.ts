import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityType } from 'src/app/models/entityType';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  _entity: EntityType = new EntityType()

  constructor() { }

  ngOnInit(): void { 
    this._entity.id = 1
    this._entity.name = 'Customers'
    this._entity.childRouter = 'customers'
  }

}
