import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from './config/globals';
import { MainViewComponent } from './modules/main-view/main-view.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UnauthorizedInterceptorService } from './services/unauthorized-interceptor.service';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './services/config.service';
import { RegisterComponent } from './modules/register/register.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSortModule } from '@angular/material/sort';
import { FooterComponent } from './modules/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerComponent } from './modules/customer/customer/customer.component';
import { CustomerDetailsComponent } from './modules/customer/customer-details/customer-details.component';
import { CustomerDetailsTenantsComponent } from './modules/customer/customer-details-tenants/customer-details-tenants.component';
import { CustomerDetailsTenantsDialogComponent } from './modules/customer/customer-details-tenants/customer-details-tenants-dialog/customer-details-tenants-dialog.component';
import { CustomerDetailsGroupsComponent } from './modules/customer/customer-details-groups/customer-details-groups.component';
import { CustomerDetailsUsersComponent } from './modules/customer/customer-details-users/customer-details-users.component';
import { CustomerDetailsGroupsDialogComponent } from './modules/customer/customer-details-groups/customer-details-groups-dialog/customer-details-groups-dialog.component';
import { CustomerDetailsUsersDialogComponent } from './modules/customer/customer-details-users/customer-details-users-dialog/customer-details-users-dialog.component';
import { UsersComponent } from './modules/users/users/users.component';
import { UsersDetailsComponent } from './modules/users/users-details/users-details.component';
import { ListSearchComponent } from './modules/list-search/list-search.component';

const appConfig = (config: ConfigService) => {
  return () => {
    return config.dealerIsRegistered()
  }
}

const checkServerStatus = (config: ConfigService) => {
  return () => {
    return config.checkServerStatus()
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CustomerDetailsTenantsComponent,
    CustomerDetailsTenantsDialogComponent,
    CustomerDetailsGroupsComponent,
    CustomerDetailsUsersComponent,
    CustomerDetailsGroupsDialogComponent,
    CustomerDetailsUsersDialogComponent,
    FooterComponent,
    UsersComponent,
    UsersDetailsComponent,
    ListSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    SweetAlert2Module.forRoot(),
    FlexLayoutModule
  ],
  providers: [
    ConfigService,
    AuthService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: checkServerStatus,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptorService,
      multi: true
    },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
