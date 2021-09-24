import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AspNetUsers } from 'src/app/models/aspNetUsers';
import { Customer } from 'src/app/models/customer';
import { AspnetusersService } from 'src/app/services/aspnetusers.service';
import { CustomerDetailsUsersDialogComponent } from './customer-details-users-dialog/customer-details-users-dialog.component';

@Component({
  selector: 'app-customer-details-users',
  templateUrl: './customer-details-users.component.html',
  styleUrls: ['./customer-details-users.component.scss']
})
export class CustomerDetailsUsersComponent implements OnInit {

  @Input() _customer: Customer;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  displayedColumns: string[] = ['Name', 'LastName', 'Email', 'Group', 'Inactive'];
  dataSource = new MatTableDataSource<AspNetUsers>()

  constructor(private _aspnetusersService: AspnetusersService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this._aspnetusersService.getAspNetUsersGroupByCustomer(this._customer.id).subscribe(
      data => {
        if (!data.error && data.data) {          
          this.dataSource = new MatTableDataSource<AspNetUsers>(data.data)
        }
      },
      err => { console.log(err) }
    )
  }

  newUser(_aspNetUsers: AspNetUsers) {
    if (!_aspNetUsers) {
      _aspNetUsers = new AspNetUsers()
      _aspNetUsers.customerId = this._customer.id
    }

    const dialogRef = this.dialog.open(CustomerDetailsUsersDialogComponent, {
      data: { ..._aspNetUsers },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers()
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
