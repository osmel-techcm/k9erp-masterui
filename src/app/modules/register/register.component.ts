import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ajaxRequest = false

  loading = {
    color: "#FFF",
    mode: "indeterminate",
    diameter: 15
  };

  register = {
    group: '',
    email: '',
    password: '',
    _password: ''
  }

  validation = {
    group: false,
    email: false,
    password: false,
    _password: false
  }

  message = {
    title: null,
    text: null
  };

  currentYear = new Date().getFullYear();

  constructor(private _router: Router, private config: ConfigService) {

  }

  ngOnInit() {
    if (!this.config.serverIsAlive()) {
      this._router.navigate(['/notfound'])
      return
    }
    if (this.config.IsRegistered() === 'True') {
      this._router.navigate(['/login'])
      return
    }

    //this.register.auth_email = 'osmel@techcm.com'
    //this.register.email = 'osmel@techcm.com'
    //this.register.group = 'Administrators'
    //this.register.password = 'Pp1234560!'
    //this.register._password = 'Pp1234560!'

  }

  initValidation() {
    this.validation = {      
      group: false,
      email: false,
      password: false,
      _password: false
    }
  }

  registerApp() {
    this.initValidation()

    let errorValidations = false;

    if (!this.register.group) {
      this.validation.group = true
      errorValidations = true
    }

    if (!this.register.email) {
      this.validation.email = true
      errorValidations = true
    }

    if (!this.register.password) {
      this.validation.password = true
      errorValidations = true
    }

    if (!this.register._password) {
      this.validation._password = true
      errorValidations = true
    }

    if (errorValidations) {
      return
    }

    if (this.register.password !== this.register._password) {
      Swal.fire({
        title: "Information",
        text: "The password does not match",
        confirmButtonText: "OK"
      });
      return
    }

    this.ajaxRequest = true

    this.config.registerDealer(this.register).subscribe(
      res => {
        this.ajaxRequest = false
        if (!res.error) {
          this.config.getDealerInfo().subscribe(
            data => {
              console.log(data)
              if (!data.error) {
                this.config.updateDealerdata(data.data)
                this._router.navigate(['/login'])
              }  
            }
          )          
        } else {
          console.log(res)
          let errors = res.data.errors
          if (!errors) {
            errors = res.othersValidations.errors
          }

          let messageError = ''
          if (errors) {
            for (let i = 0; i < errors.length; i++) {
              messageError += '<div>' + errors[i].description + '</div>'
            }
          } else {
            messageError = res.description
          }          

          Swal.fire({
            title: "Information",
            html: messageError,
            confirmButtonText: "OK"
          });
        }
      },
      err => {
        this.ajaxRequest = false
        console.log(err)
      }
    )

  }

}
