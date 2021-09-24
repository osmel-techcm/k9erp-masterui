import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  _customer = new Customer()
  _loadDetails = false

  constructor(private _router: Router, private route: ActivatedRoute, private _customerService: CustomersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._customer.id = +param.get('id')
        if (this._customer.id) {
          this.loadCustomerDetails()
        } else {
          this._customer = new Customer()
          this._loadDetails = true
        }       
      }
    )
  }

  loadCustomerDetails() {
    this._customerService.getCustomer(this._customer.id).subscribe(
      data => {
        if (!data.error) {
          this._customer = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  saveCustomer() {    
    if (this._customer.id) {
      this._customerService.putCustomer(this._customer).subscribe(
        data => {
          //console.log(data)
          if (!data.error) {
            this.openSnackBar(data.description,'')
          }
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this._customerService.postCustomer(this._customer).subscribe(
        data => {          
          if (!data.error) {
            this.openCustomer(data.data.id)
          }
          this.openSnackBar(data.description, '')
        },
        err => {
          console.log(err)
        }
      )
    }
    
  }

  goToCustomerList(ev) {
    this._router.navigate(['/mainview/customers'])
  }

  confirmDelete() {
    console.log('we need to make the validations in the api!!!!!!! \n before the delete.....')
  }

  openCustomer(id: number) {
    this._router.navigate(['/mainview/customers/' + id]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }

}
