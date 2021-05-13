"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var nutrion_programs_component_1 = require("./pages/nutrion-programs/nutrion-programs.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_component_1 = require("./admin/admin.component");
var admin_category_component_1 = require("./admin/admin-category/admin-category.component");
var admin_product_component_1 = require("./admin/admin-product/admin-product.component");
var admin_orders_component_1 = require("./admin/admin-orders/admin-orders.component");
var home_component_1 = require("./pages/home/home.component");
var log_in_component_1 = require("./registration/log-in/log-in.component");
var profile_component_1 = require("./profile/profile.component");
var basket_component_1 = require("./pages/basket/basket.component");
var dish_component_1 = require("./pages/dish/dish.component");
var get_started_component_1 = require("./pages/get-started/get-started.component");
var sign_up_component_1 = require("./registration/sign-up/sign-up.component");
var log_in_guard_1 = require("./shared/guards/log-in.guard");
var admin_nutritions_component_1 = require("./admin/admin-nutritions/admin-nutritions.component");
var courier_component_1 = require("./courier/courier.component");
var routes = [
    { path: 'log-in', component: log_in_component_1.LogInComponent },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [log_in_guard_1.LogInGuard], children: [
            { path: '', pathMatch: 'full', redirectTo: 'category' },
            { path: 'category', component: admin_category_component_1.AdminCategoryComponent },
            { path: 'products', component: admin_product_component_1.AdminProductComponent },
            { path: 'orders', component: admin_orders_component_1.AdminOrdersComponent },
            { path: 'nutritions', component: admin_nutritions_component_1.AdminNutritionsComponent }
        ] },
    { path: 'courier', component: courier_component_1.CourierComponent, canActivate: [log_in_guard_1.LogInGuard] },
    // {path:'cooker',component:CookerComponent,canActivate:[LogInGuard]},
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'menu/:category', component: dish_component_1.DishComponent },
    { path: 'nutrion/:category', component: nutrion_programs_component_1.NutrionProgramsComponent },
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
    { path: 'basket', component: basket_component_1.BasketComponent },
    { path: 'get-started', component: get_started_component_1.GetStartedComponent },
    { path: 'sign-up', component: sign_up_component_1.SignUpComponent },
    { path: '**', redirectTo: 'home' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
