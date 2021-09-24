import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Globals } from '../../config/globals';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  userData = {
    email: null,
    password: null
  };

  currentYear = new Date().getFullYear();

  message = {
    title: null,
    text: null
  };

  loading = {
    color: "#FFF",
    mode: "indeterminate",
    diameter: 15
  };

  tenantId: string;

  ajaxRequest: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, public dialogTenant: MatDialog, public _globals: Globals, private config: ConfigService) { }

  ngOnInit() {

    if (!this.config.serverIsAlive()) {
      this._router.navigate(['/notfound'])
      return
    }

    if (this.config.IsRegistered() === 'False') {
      this._router.navigate(['/register'])
      return
    }

    if (this._auth.loggedIn()) {
      this._router.navigate(["/mainview"])
      return
    }

  }

  openDialog(infoTitle, infoText) {
    this.message.title = infoTitle ? infoTitle : "Information";
    this.message.text = infoText;

    Swal.fire({
      title: this.message.title,
      text: this.message.text,
      confirmButtonText: "OK",
      heightAuto: false
    });
  }

  loginUser() {
    if (!this.userData.email) {
      this.openDialog(null, "Please insert an email!");
      return;
    }

    if (!this.userData.password) {
      this.openDialog(null, "Please insert a password!");
      return;
    }

    this.ajaxRequest = true;

    this._auth.loginUser(this.userData).subscribe(
      res => {
        if (!res.error) {
          this.config.saveTokenStorage(res.data)
          this._router.navigate(["/mainview"]);
        } else {
          this.openDialog(null, res.description);
        }
      },
      err => (this.ajaxRequest = false),
      () => (this.ajaxRequest = false)
    );
  }
}
