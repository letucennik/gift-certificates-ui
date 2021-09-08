import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewItemComponent } from './new-item/new-item.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LogoutComponent } from './logout/logout.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRoleUtil } from './_enums/user-role.util';
import { UserRole } from './_enums/user-role.enum';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
const routes: Routes = [
  {
    path:'',
    component:MainComponent,
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'new-item',
    component:NewItemComponent,
    canActivate: [AuthGuard],
    data: {
      role:  UserRoleUtil.toString(UserRole.ADMIN)
    }
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'details',
    component:DetailsComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path: 'certificates/:id',
    component: DetailsComponent
  },
  {
    path: 'certificates/:id/edit',
    component: EditCertificateComponent,
    canActivate: [AuthGuard],
    data: {
      role:  UserRoleUtil.toString(UserRole.ADMIN)
    }
  },
  {
    path:'403',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
