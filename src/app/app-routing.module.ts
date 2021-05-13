import { NutrionProgramsComponent } from './pages/nutrion-programs/nutrion-programs.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './registration/log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './pages/basket/basket.component';
import { DishComponent } from './pages/dish/dish.component';

import { GetStartedComponent } from './pages/get-started/get-started.component';

import { SignUpComponent } from './registration/sign-up/sign-up.component';
import { LogInGuard } from './shared/guards/log-in.guard';
import { AdminNutritionsComponent } from './admin/admin-nutritions/admin-nutritions.component';
// import { CookerComponent } from './cooker/cooker.component';
import { LogInService } from './shared/services/log-in.service';
import { CourierComponent } from './courier/courier.component';


const routes: Routes = [
  {path:'log-in',component:LogInComponent},
  { path: 'admin', component: AdminComponent,canActivate:[LogInGuard],children: [
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'products', component: AdminProductComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'nutritions', component: AdminNutritionsComponent }
  ] },
  {path:'courier',component:CourierComponent,canActivate:[LogInGuard]},
  // {path:'cooker',component:CookerComponent,canActivate:[LogInGuard]},
  {path:'home',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'menu/:category',component:DishComponent},
  {path:'nutrion/:category',component:NutrionProgramsComponent},
  // {path:'nutrion-programs',component:NutrionProgramsComponent},
  // {path:'pasta',component:PastaComponent},
  // {path:'bakery',component:BakeryComponent},
  // {path:'smothie',component:SmoothieComponent},
  // {path:'salad',component:SaladComponent},
  // {path:'soup',component:SoupComponent},
  // {path:'sweet',component:SweetComponent},
  // {path:'bowl',component:BowlComponent},
  // {path:'fishdish',component:FishDishComponent},
  // {path:'meatdish',component:MeatDishComponent},
  // {path:'log-in',component:LogInComponent},
  // {path:'profile',component:ProfileComponent},
  {path:'basket',component:BasketComponent},
  {path:'get-started',component:GetStartedComponent},
  {path:'sign-up',component:SignUpComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
