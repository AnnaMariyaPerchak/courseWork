"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpLoaderFactory = exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var radio_1 = require("@angular/material/radio");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var admin_component_1 = require("./admin/admin.component");
var header_component_1 = require("./component/header/header.component");
var footer_component_1 = require("./component/footer/footer.component");
var home_component_1 = require("./pages/home/home.component");
var log_in_component_1 = require("./registration/log-in/log-in.component");
var profile_component_1 = require("./profile/profile.component");
var basket_component_1 = require("./pages/basket/basket.component");
var dish_component_1 = require("./pages/dish/dish.component");
var get_started_component_1 = require("./pages/get-started/get-started.component");
var sign_up_component_1 = require("./registration/sign-up/sign-up.component");
var admin_category_component_1 = require("./admin/admin-category/admin-category.component");
var admin_product_component_1 = require("./admin/admin-product/admin-product.component");
var animations_1 = require("@angular/platform-browser/animations");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var modal_1 = require("ngx-bootstrap/modal");
var search_pipe_1 = require("./shared/pipes/search.pipe");
var http_1 = require("@angular/common/http");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var auth_1 = require("@angular/fire/auth");
var storage_1 = require("@angular/fire/storage");
var environment_1 = require("../environments/environment");
var ng2_animate_on_scroll_1 = require("ng2-animate-on-scroll");
var admin_orders_component_1 = require("./admin/admin-orders/admin-orders.component");
var truncate_text_pipe_1 = require("./shared/pipes/truncate-text.pipe");
var nutrion_programs_component_1 = require("./pages/nutrion-programs/nutrion-programs.component");
var admin_nutritions_component_1 = require("./admin/admin-nutritions/admin-nutritions.component");
var courier_component_1 = require("./courier/courier.component");
// import { CookerComponent } from './cooker/cooker.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                admin_component_1.AdminComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                log_in_component_1.LogInComponent,
                profile_component_1.ProfileComponent,
                basket_component_1.BasketComponent,
                get_started_component_1.GetStartedComponent,
                sign_up_component_1.SignUpComponent,
                admin_category_component_1.AdminCategoryComponent,
                admin_product_component_1.AdminProductComponent,
                search_pipe_1.SearchPipe,
                admin_product_component_1.AdminProductComponent,
                dish_component_1.DishComponent,
                admin_orders_component_1.AdminOrdersComponent,
                truncate_text_pipe_1.TruncateTextPipe,
                nutrion_programs_component_1.NutrionProgramsComponent,
                admin_nutritions_component_1.AdminNutritionsComponent,
                courier_component_1.CourierComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                forms_1.FormsModule,
                http_1.HttpClientModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                storage_1.AngularFireStorageModule,
                auth_1.AngularFireAuthModule,
                firestore_1.AngularFirestoreModule,
                radio_1.MatRadioModule,
                ng2_animate_on_scroll_1.AnimateOnScrollModule.forRoot(),
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                })
                // NgbModule,
                // NgbModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
