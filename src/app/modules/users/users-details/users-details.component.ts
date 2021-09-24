import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AspNetUsers } from 'src/app/models/aspNetUsers';
import { AspnetusersService } from 'src/app/services/aspnetusers.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  _user = new AspNetUsers();
  _loadDetails = false

  constructor(private _router: Router, private route: ActivatedRoute, private _usersService: AspnetusersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this._user.id = param.get('id')
        if (this._user.id != '0') {
          this.loadUserDetails()
        } else {
          this._user = new AspNetUsers()
          this._user.inactive = false  
          this._user.masterDealer = true
          this._loadDetails = true
        }        
      }
    )
  }

  loadUserDetails() {
    this._usersService.getUser(this._user.id).subscribe(
      data => {
        if (!data.error) {
          this._user = data.data
        } else {
          console.log(data.description)
        }
        this._loadDetails = true
      }
    )
  }

  openUser(id: number){
    this._router.navigate(['/mainview/users/' + id])
  }

  saveUser(){
    this._user.password = this._user.passwordHash

    if (this._user.id) {
      this._usersService.putUser(this._user).subscribe(
        data => {
          this.openSnackBar(data.description, '', data.errorValue)
        },
        err => {
          console.log(err)
        }
      )
    } else {      
      this._usersService.postUser(this._user).subscribe(
        data => {
          if (!data.error) {
            this.openUser(data.data.id)
          } else {
            if (data.othersValidations) {
              let messageError = ''
              let errors = data.othersValidations.errors
              for (let i = 0; i < errors.length; i++) {
                messageError += errors[i].description + '\n'
              }
              this.openSnackBar(messageError, '', data.errorValue)
            } else {
              this.openSnackBar(data.description, '', data.errorValue)
            }
          }          
        },
        err => {

        }
      )
    }
  }

  goToUserList(){
    this._router.navigate(['/mainview/users/'])
  }

  openSnackBar(message: string, action: string, type: number = 1) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
