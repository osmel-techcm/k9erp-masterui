import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AspNetUsersGroups } from 'src/app/models/aspNetUsersGroups';

@Component({
  selector: 'app-customer-details-groups-dialog',
  templateUrl: './customer-details-groups-dialog.component.html',
  styleUrls: ['./customer-details-groups-dialog.component.scss']
})
export class CustomerDetailsGroupsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerDetailsGroupsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AspNetUsersGroups, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  saveDialog() {
    if (!this.data.name) {
      this.openSnackBar('Insert a name', '', 1)
      return
    }
    this.dialogRef.close(this.data)
  }

  openSnackBar(message: string, action: string, type: number) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type === 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
