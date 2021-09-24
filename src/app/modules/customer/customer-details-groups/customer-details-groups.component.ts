import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AspNetUsersGroups } from 'src/app/models/aspNetUsersGroups';
import { Customer } from 'src/app/models/customer';
import { AspNetUsersGroupService } from 'src/app/services/asp-net-users-group.service';
import { CustomerDetailsGroupsDialogComponent } from './customer-details-groups-dialog/customer-details-groups-dialog.component';

@Component({
  selector: 'app-customer-details-groups',
  templateUrl: './customer-details-groups.component.html',
  styleUrls: ['./customer-details-groups.component.scss']
})
export class CustomerDetailsGroupsComponent implements OnInit {

  @Input() _customer: Customer;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  displayedColumns: string[] = ['Name', 'Administrator', 'Inactive'];
  dataSource = new MatTableDataSource<AspNetUsersGroups>()

  constructor(private _aspNetUsersGroupService: AspNetUsersGroupService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getGroups()
  }


  getGroups() {
    this._aspNetUsersGroupService.getAspNetUsersGroupByCustomer(this._customer.id).subscribe(
      data => {
        if (!data.error) {
          this.dataSource = new MatTableDataSource<AspNetUsersGroups>(data.data)
        } 
      },
      error => {
        console.log(error)
      }
    )
  }

  newGroup(_aspNetUsersGroups: AspNetUsersGroups) {
    if (!_aspNetUsersGroups) {
      _aspNetUsersGroups = new AspNetUsersGroups()
      _aspNetUsersGroups.idCustomer = this._customer.id
    }

    const dialogRef = this.dialog.open(CustomerDetailsGroupsDialogComponent, {
      width: '250px',
      data: { ..._aspNetUsersGroups },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this._aspNetUsersGroupService.putAspNetUsersGroup(result).subscribe(
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
        this._aspNetUsersGroupService.postAspNetUsersGroup(result).subscribe(
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
    })

  }

  openSnackBar(message: string, action: string, type: number) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type === 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
