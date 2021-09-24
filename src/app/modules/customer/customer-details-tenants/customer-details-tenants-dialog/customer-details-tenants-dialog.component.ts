import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tenant } from 'src/app/models/tenant';

@Component({
  selector: 'app-customer-details-tenants-dialog',
  templateUrl: './customer-details-tenants-dialog.component.html',
  styleUrls: ['./customer-details-tenants-dialog.component.scss']
})
export class CustomerDetailsTenantsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerDetailsTenantsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Tenant, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //console.log(this.data)
  }

  closeDialog(){
    this.dialogRef.close(null)
  }

  saveDialog() {
    if (!this.data.tenantName) {
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
