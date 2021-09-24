import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './modules/main-view/main-view.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { CustomerComponent } from './modules/customer/customer/customer.component';
import { CustomerDetailsComponent } from './modules/customer/customer-details/customer-details.component';
import { UsersDetailsComponent } from './modules/users/users-details/users-details.component';
import { UsersComponent } from './modules/users/users/users.component';


const routes: Routes = [
  {
    path: "mainview",
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      { path: "dashboard", component: DashboardComponent },
      { path: "customers/:id", component: CustomerDetailsComponent },
      { path: "customers", component: CustomerComponent },
      { path: "users/:id", component: UsersDetailsComponent },
      { path: "users", component: UsersComponent }
    ]
  },
  { path: "register", component: RegisterComponent },
  { path: "notfound", component: NotfoundComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/mainview/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/mainview/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
