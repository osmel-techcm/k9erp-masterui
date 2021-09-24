import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { Customer } from 'src/app/models/customer';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Tenant } from 'src/app/models/tenant';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailsTenantsDialogComponent } from './customer-details-tenants-dialog/customer-details-tenants-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-details-tenants',
  templateUrl: './customer-details-tenants.component.html',
  styleUrls: ['./customer-details-tenants.component.scss']
})
export class CustomerDetailsTenantsComponent implements OnInit {

  @Input() _customer: Customer;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  displayedColumns: string[] = ['TenantName', 'ConnectionString', 'Inactive'];
  dataSource = new MatTableDataSource<Tenant>()

  constructor(private _customerDetailsService: CustomerDetailsService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTenants()
  }

  getTenants(){
    this._customerDetailsService.getTenants(this._customer.id).subscribe(
      data => { 
        if (!data.error) {
          this.dataSource = new MatTableDataSource<Tenant>(data.data.rows)
        }        
      },
      err => { console.log(err) }
    )
  }

  newTenant(_tenant: Tenant) {

    if (!_tenant) {
      _tenant = new Tenant()
      _tenant.customer = this._customer.id
    }    

    const dialogRef = this.dialog.open(CustomerDetailsTenantsDialogComponent, {
      width: '250px',
      data: {..._tenant},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this._customerDetailsService.putTenants(result).subscribe(
          data => {
            if (!data.error) {
              this.dataSource.data = this.dataSource.data.map((val) => {
                if (val.id === result.id) {
                  val = result
                }
                return val
              })              
            }
            this.openSnackBar(data.description, null, data.errorValue)
          },
          err => {
            console.log(err)
          }
        )
      } else if (result && !result.id) {
        this._customerDetailsService.postTenants(result).subscribe(
          data => {
            if (!data.error) {
              this.dataSource.data.push(data.data)
              this.table.renderRows()
            } else {
              console.log(data.description)
            }
            this.openSnackBar(data.description, null, data.errorValue)
          },
          error => {
            console.log(error.description)
          }
        )        
      } 
    });
    
  }

  openSnackBar(message: string, action: string, type: number) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type === 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
