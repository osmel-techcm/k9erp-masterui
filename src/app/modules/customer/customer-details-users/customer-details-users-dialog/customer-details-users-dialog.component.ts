import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AspNetUsers } from 'src/app/models/aspNetUsers';
import { AspNetUsersGroups } from 'src/app/models/aspNetUsersGroups';
import { AspNetUsersGroupService } from 'src/app/services/asp-net-users-group.service';
import { AspnetusersService } from 'src/app/services/aspnetusers.service';

@Component({
  selector: 'app-customer-details-users-dialog',
  templateUrl: './customer-details-users-dialog.component.html',
  styleUrls: ['./customer-details-users-dialog.component.scss']
})
export class CustomerDetailsUsersDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerDetailsUsersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AspNetUsers,
    private _snackBar: MatSnackBar,
    private _aspNetUsersGroupService: AspNetUsersGroupService, private _aspnetusersService: AspnetusersService) { }

  aspnetusergroups: AspNetUsersGroups[]
  savingData = false;

  ngOnInit(): void {
    if (this.data.id) {
      this.data.password = this.data.passwordHash
      this.data.rePasword = this.data.passwordHash
    }
    this.loadUserGroups()
  }

  loadUserGroups() {
    this._aspNetUsersGroupService.getAspNetUsersGroupByCustomer(this.data.customerId).subscribe(
      data => {
        if (!data.error) {
          this.aspnetusergroups = data.data
        }
      }
    )
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  saveDialog() {
    if (!this.data.name) {
      this.openSnackBar('Insert a name', '', 1)
      return
    }
    if (!this.data.lastName) {
      this.openSnackBar('Insert a last name', '', 1)
      return
    }
    if (!this.data.email) {
      this.openSnackBar('Insert a email', '', 1)
      return
    }
    if (!this.data.idGroup) {
      this.openSnackBar('Insert a group', '', 1)
      return
    }
    if (!this.data.password) {
      this.openSnackBar('Insert a password', '', 1)
      return
    }
    if (this.data.password !== this.data.rePasword) {
      this.openSnackBar('Password not match!', '', 1)
      return
    }

    this.savingData = true

    this.data.userName = this.data.email

    if (this.data.id) {
      this._aspnetusersService.putUsers(this.data).subscribe(
        data => {
          if (!data.error) {
            this.dialogRef.close(this.data)
            this.openSnackBar(data.description, null, data.errorValue)
          } else {
            if (data.othersValidations && data.othersValidations.errors) {
              let message = "";
              for (let i = 0; i < data.othersValidations.errors.length; i++) {
                message += data.othersValidations.errors[i].description + '\n';
              }
              this.openSnackBar(message, '', 1, 10000)
            } else {
              this.openSnackBar(data.description, '', 1, 10000)
            }
          }
        },
        err => {
          this.openSnackBar(err, '', 1, 5000)
        },
        () => {
          this.savingData = false
        }
      )
    } else {
      this._aspnetusersService.postUsers(this.data).subscribe(
        data => {
          console.log(data)
          if (!data.error) {
            this.dialogRef.close(this.data)
            this.openSnackBar(data.description, null, data.errorValue)
          } else {
            if (data.othersValidations && data.othersValidations.errors) {
              let message = "";
              for (let i = 0; i < data.othersValidations.errors.length; i++) {
                message += data.othersValidations.errors[i].description + '\n';
              }
              this.openSnackBar(message, '', 1, 10000)
            } else {
              this.openSnackBar(data.description, '', 1, 10000)
            }
          }
        },
        err => {
          this.openSnackBar(err, '', 1, 5000)
        },
        () => {
          this.savingData = false
        }
      )
    }    
  }

  openSnackBar(message: string, action: string, type: number, duration = 2000) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: type === 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
